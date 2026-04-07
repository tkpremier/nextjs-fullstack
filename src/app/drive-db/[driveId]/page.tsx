import { getDrive } from '@/services/db/drive';
import { getFile } from '@/services/drive';
import { DriveDB } from '@/types/db/drive';
import { getDuration, getImageLink } from '@/utils';
import type { drive_v3 } from 'googleapis';
import Image from 'next/image';
import { Suspense } from 'react';

const getDriveFile = async (
  driveId: string
): Promise<[Array<DriveDB>, drive_v3.Schema$File | undefined]> => {
  try {
    const dbResponse = await getDrive(driveId);
    const apiResponse = await getFile(driveId);
    return [dbResponse.data, apiResponse.data];
  } catch (error) {
    console.error('DriveFile error: ', error);
    return [[], undefined];
  }
};

const DriveDbFile = async ({ params }: { params: Promise<{ driveId: string }> }) => {
  const { driveId } = await params;
  const [db, api] = await getDriveFile(driveId);
  const drive = db.length > 0 ? db[0] : undefined;
  return (
    <>
      {
        drive ? (
          <Suspense fallback={<div>Loading Db Data...</div>}>
            <h2>{drive.name}</h2>
            {drive.webViewLink ? (
              <a href={drive.webViewLink} target="_blank" rel="noreferrer nofollower">
                {drive.thumbnailLink ? (
                  <Image
                    src={getImageLink(drive.thumbnailLink, 's2400', 's220')}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    title={`${drive.name}`}
                    alt={`${drive.name} - Thumbnail`}
                    width={1200}
                    height={1200}
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    style={{
                      width: 'auto',
                      maxWidth: 'min(100%, 1200px)',
                      height: 'auto',
                    }}
                    placeholder="blur"
                    blurDataURL="/images/video_placeholder_165x103.svg"
                  />
                ) : (
                  <Image
                    src="/images/video_placeholder_165x103.svg"
                    alt={`${drive.name} - Placeholder`}
                    width={600}
                    height={338}
                    style={{
                      width: 'auto',
                      maxWidth: 'min(100%, 1200px)',
                      height: 'auto',
                    }}
                  />
                )}
              </a>
            ) : null}
            <p>
              <strong>Created on: </strong>
              {drive.createdTime}
            </p>
            {drive.lastViewed ? (
              <p>
                <strong>Last viewed: </strong>
                {drive.lastViewed}
              </p>
            ) : null}
            {drive.duration != null && drive.duration > 0 ? (
              <p>
                <strong>Duration: </strong>
                {getDuration(drive.duration)}
              </p>
            ) : null}
            {/* <ModelForm key={`model_form-${drive.driveId}`} drive={drive} />
            <DriveFileView key={`file_view-${drive.driveId}`} file={drive} source="drive-db" /> */}
          </Suspense>
        ) : <h2>No Db Data for id: {driveId}</h2>
      }
      {api?.name ? (
        <Suspense fallback={<div>Loading Api Data...</div>}>
          <h2>Api {api.name}</h2>
        </Suspense>
      ) : (
        <h2>No API data for id: {driveId}</h2>
      )}
    </>
  );
};

export default DriveDbFile;
