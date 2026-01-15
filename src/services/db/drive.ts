import dbQuery from '@/_db/dev/dbQuery';
import { DriveDB, DriveInsertValue, DriveUpdatePayload } from '@/types/db/drive';
import { SyncStats } from '@/types/drive';
import { DbResponse } from '@/types/util';
import { camelCaseObjectWithDates, getExistingDriveIdentifiers, normalizeColumnName } from '@/utils/db';
import { format } from 'date-fns';
import { drive_v3 } from 'googleapis';
import { listFiles } from '../drive';

export const createDrive = async (values: DriveInsertValue[]): Promise<DbResponse['rows']> => {
  /*
    (id VARCHAR(100) NOT NULL,
    drive_id VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    web_view_link VARCHAR(100) NOT NULL,
    web_content_link VARCHAR(100) NOT NULL,
    thumbnail_link VARCHAR(100),
    created_time TIMESTAMPTZ NOT NULL,
    last_viewed TIMESTAMPTZ,
    created_on TIMESTAMPTZ NOT NULL)
  */
  const createDriveFileQuery = `INSERT INTO
  drive(id, drive_id, type, name, web_view_link, web_content_link, thumbnail_link, created_time, last_viewed, duration, model_id, description, size, created_on)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  returning *`;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  values.push(createdOn);
  const { rows } = (await dbQuery.query(createDriveFileQuery, values)) as DbResponse;
  return rows;
};

export const getDrive = async (id?: string) => {
  const getDriveFileQuery = id
    ? `SELECT * FROM
  drive WHERE id = $1`
    : `SELECT * FROM
  drive ORDER BY created_time DESC`;
  const values = id ? [id] : [];
  try {
    const { rows: data } = await dbQuery.query(getDriveFileQuery, values);
    if (data[0] === undefined) {
      console.log('There are no drive files');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }

    return {
      data: data.map((f: DriveDB) =>
        camelCaseObjectWithDates(f, ['createdOn', 'createdTime', 'lastViewed'])
      ) as Array<DriveDB>
    };
  } catch (error) {
    console.error('Error getting drive files from database', error);
    return { data: [] };
  }
};

export const deleteDrive = async (id: string) => {
  const deleteDriveFileQuery = `DELETE FROM drive WHERE id = $1 RETURNING *`;
  const values = [id];
  try {
    const { rows: data } = await dbQuery.query(deleteDriveFileQuery, values);
    if (data[0] === undefined) {
      console.log('Drive file not found');
      return { data: [] };
    }

    const deletedDrive = data[0] as DriveDB & { model_id?: Array<number> | null; drive_id: string };
    const modelIds = deletedDrive.model_id;
    const driveId = deletedDrive.drive_id;

    // If model_id is not empty, update each model's drive_ids array
    if (modelIds && Array.isArray(modelIds) && modelIds.length > 0) {
      for (const modelId of modelIds) {
        const updateModelQuery = `UPDATE model
          SET drive_ids = array_remove(drive_ids, $1)
          WHERE id = $2`;
        try {
          await dbQuery.query(updateModelQuery, [driveId, modelId]);
        } catch (error) {
          console.log(`Error updating model ${modelId} after drive deletion:`, error);
          // Continue with other model updates even if one fails
        }
      }
    }

    return {
      data: data.map((f: DriveDB) =>
        camelCaseObjectWithDates(f, ['createdOn', 'createdTime', 'lastViewed'])
      ) as Array<DriveDB>
    };
  } catch (error) {
    return new Error(error);
  }
};

export const updateDrive = async (
  data: Array<string | number | Array<number>> | DriveUpdatePayload
): Promise<{ data: DbResponse['rows'] }> => {
  if (Array.isArray(data)) {
    const mutableData = [...data];
    const column = mutableData.shift();
    if (!column) {
      console.warn('updateDrive called without column name for legacy payload');
      return { data: [] };
    }
    const query = `UPDATE drive
  SET ${column} = array_cat(model_id, $1)
  WHERE id = $2
  RETURNING *`;
    try {
      const { rows } = (await dbQuery.query(query, mutableData)) as DbResponse;
      console.log('query', query, 'dta', mutableData, rows);
      return {
        data: rows.map((f: DriveDB) =>
          camelCaseObjectWithDates(f, ['createdOn', 'createdTime', 'lastViewed'], 'MM/dd/yyyy')
        )
      };
    } catch (error) {
      console.log('An error occurred', error);
      return { data: [] };
    }
  }

  if (!data || typeof data !== 'object') {
    return { data: [] };
  }

  const payload = { ...data };
  const identifier = payload.id ?? payload.driveId ?? payload.drive_id;
  const identifierColumn = payload.id ? 'id' : 'drive_id';

  delete payload.id;
  delete payload.driveId;
  delete payload.drive_id;

  const entries = Object.entries(payload).filter(([, value]) => value !== undefined);

  if (!identifier) {
    console.warn('updateDrive called without identifier');
    return { data: [] };
  }

  if (entries.length === 0) {
    return { data: [] };
  }

  const setClause = entries.map(([key], index) => `${normalizeColumnName(key)} = $${index + 1}`).join(', ');
  const values = entries.map(([, value]) => value);
  values.push(identifier);

  const query = `UPDATE drive
  SET ${setClause}
  WHERE ${identifierColumn} = $${values.length}
  RETURNING *`;

  try {
    const { rows } = (await dbQuery.query(query, values)) as DbResponse;
    return {
      data: rows.map((f: DriveDB) =>
        camelCaseObjectWithDates(f, ['createdOn', 'createdTime', 'lastViewed'], 'MM/dd/yyyy')
      )
    };
  } catch (error) {
    console.log('An error occurred', error);
    return { data: [] };
  }
};

const deriveDriveType = (mimeType?: string | null) => {
  if (!mimeType) {
    return 'unknown';
  }
  if (mimeType === 'application/vnd.google-apps.folder') {
    return 'folder';
  }
  if (mimeType.startsWith('image/')) {
    return 'image';
  }
  if (mimeType.startsWith('video/')) {
    return 'video';
  }
  return mimeType;
};

const buildInsertValues = (file: drive_v3.Schema$File) => {
  const rawDuration = file.videoMediaMetadata?.durationMillis;
  const parsedDuration = rawDuration !== undefined ? Number(rawDuration) : null;
  const duration = Number.isFinite(parsedDuration ?? NaN) ? parsedDuration : null;

  return [
    file.id!,
    file.id!,
    deriveDriveType(file.mimeType),
    file.name ?? '',
    file.webViewLink ?? '',
    file.webContentLink ?? file.webViewLink ?? '',
    file.thumbnailLink ?? null,
    file.createdTime,
    file.viewedByMeTime ?? file.createdTime,
    duration,
    [] as number[],
    file.description ?? null,
    file.size ?? null
  ];
};

const buildUpdatePayload = (file: drive_v3.Schema$File, existingId?: string) => {
  const rawDuration = file.videoMediaMetadata?.durationMillis;
  const parsedDuration = rawDuration !== undefined ? Number(rawDuration) : null;
  const duration = Number.isFinite(parsedDuration ?? NaN) ? parsedDuration : null;
  return {
    id: existingId ?? file.id!,
    driveId: existingId ?? file.id!,
    type: deriveDriveType(file.mimeType),
    name: file.name ?? '',
    webViewLink: file.webViewLink ?? '',
    webContentLink: file.webContentLink ?? file.webViewLink ?? '',
    thumbnailLink: file.thumbnailLink ?? null,
    createdTime: file.createdTime,
    lastViewed: file.viewedByMeTime ?? file.createdTime,
    duration,
    description: file.description ?? null,
    size: file.size ?? null
  };
};

export const syncDriveFiles = async (nextPage = '', pageSize = 1000): Promise<SyncStats> => {
  const existingRecords = await getExistingDriveIdentifiers();
  const stats: SyncStats = {
    created: 0,
    updated: 0,
    errors: 0,
    processed: 0,
    lastPageToken: null,
    deleted: 0
  };

  // Track which drive_ids from the database were seen in the API response
  const seenDriveIds = new Set<string>();

  let pageToken = nextPage;

  do {
    const response = await listFiles(pageToken, pageSize);
    if (!response?.data) {
      break;
    }

    const { files = [], nextPageToken } = response.data;

    for (const file of files) {
      if (!file?.id) {
        continue;
      }

      stats.processed += 1;
      seenDriveIds.add(file.id);

      try {
        if (existingRecords.has(file.id)) {
          const existingId = existingRecords.get(file.id);
          await updateDrive(buildUpdatePayload(file, existingId));
          stats.updated += 1;
        } else {
          const rows = await createDrive(buildInsertValues(file));
          const createdRow = rows?.[0] as { id?: string } | undefined;
          const newRecordId = createdRow?.id ?? file.id;
          existingRecords.set(file.id, newRecordId);
          stats.created += 1;
        }
      } catch (error) {
        console.error(`Failed to sync drive file ${file.id}`, error);
        stats.errors += 1;
      }
    }

    pageToken = nextPageToken ?? '';
    stats.lastPageToken = nextPageToken ?? null;
  } while (pageToken);

  // Find drive_ids that exist in the database but weren't seen in the API response
  const deletedDriveIds = Array.from(existingRecords.keys()).filter(driveId => !seenDriveIds.has(driveId));

  // Delete the drive files that no longer exist in Google Drive
  for (const driveId of deletedDriveIds) {
    const databaseId = existingRecords.get(driveId);
    if (databaseId) {
      try {
        await deleteDrive(databaseId);
        console.log(`Deleted drive file ${driveId} (id: ${databaseId})`);
        stats.deleted += 1;
      } catch (error) {
        console.error(`Failed to delete drive file ${driveId} (id: ${databaseId})`, error);
        stats.errors += 1;
      }
    }
  }

  return stats;
};
