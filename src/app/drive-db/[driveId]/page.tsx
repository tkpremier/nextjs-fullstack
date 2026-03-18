import { getDrive } from '@/services/db/drive';
import { getFile } from '@/services/drive';
import { getDuration, getImageLink } from '@/utils';
import Image from 'next/image';
import { Suspense } from 'react';

const getDriveFile = async (driveId: string) => {
  try {
    const response = Promise.all([getDrive(driveId), getFile(driveId)]).then(values => values)
    return [response[0], response[1]]
  } catch (error) {
    console.error('DriveFile error: ', error);
    return [[], []]
  }
};

const DriveDbFile = async ({ params }: { params: Promise<{ driveId: string }> }) => {
  const { driveId } = await params;
  const [db, api] = await getDriveFile(driveId);
  const drive = db?.data ? Array.isArray(db?.data) && db.data.length > 0 ? db?.data[0] : db.data : { data: {} };
  console.log('db: ', db);
  console.log()
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
                    height={1200 * (9 / 16)}
                    placeholder="blur"
                    blurDataURL="/images/video_placeholder_165x103.svg"
                  />
                ) : (
                  <Image
                    src="/images/video_placeholder_165x103.svg"
                    alt={`${drive.name} - Placeholder`}
                    width={600}
                    height={338}
                  />
                )}
              </a>
            ) : null}
            <p>
              <strong>Created on: </strong>
              {drive.createdTime}
            </p>
            {drive.viewedByMeTime ? (
              <p>
                <strong>Last viewed: </strong>
                {drive.viewedByMeTime}
              </p>
            ) : null}
            {drive.duration ? (
              <p>
                <strong>Duration: </strong>
                {getDuration(parseInt(drive.duration ?? '0', 10))}
              </p>
            ) : null}
            {/* <ModelForm key={`model_form-${drive.driveId}`} drive={drive} />
            <DriveFileView key={`file_view-${drive.driveId}`} file={drive} source="drive-db" /> */}
          </Suspense>
        ) : <h2>No Db Data for id: {driveId}</h2>
      }
      {
        api && api.data ? (
          <Suspense fallback={<div>Loading Api Data...</div>}>
            <h2>Api {api.data.name}</h2>
          </Suspense>
        ) : <h2>No Db data for api.data.id</h2>
      }
    </>
  );
};

export default DriveDbFile;
