import { Grid } from '@/components/drive/Grid';
import { auth0 } from '@/lib/auth0';
import { GoogleDriveAPIResponse, MergedData } from '@/types';
import handleResponse from '@/utils/handleResponse';
import { format } from 'date-fns';

const getDriveFromApi = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/drive-google`, {
      credentials: 'include'
    });
    const data: Awaited<{ files: Array<GoogleDriveAPIResponse>; nextPageToken: string }> = await handleResponse(
      response
    );
    const files: Array<MergedData> = data?.files
      .filter(
        (f: GoogleDriveAPIResponse) =>
          f.id != null && f.name != null && f.mimeType != null && f.webViewLink != null && f.createdTime != null
      )
      .map(f => {
        return {
          ...f,
          createdTime: format(new Date(f.createdTime as string), 'MM/dd/yyyy, h:mm a'),
          viewedByMeTime: f.viewedByMeTime ? format(new Date(f.viewedByMeTime), 'MM/dd/yyyy, h:mm a') : null
        } as unknown as MergedData;
      });
    return {
      files,
      nextPageToken: data.nextPageToken
    };
  } catch (error) {
    console.error('error: ', error);
    return { files: [], nextPageToken: '' };
  }
};

const Drive = async () => {
  const session = await auth0.getSession();
  console.log('drive page session: ', session);
  const driveData = await getDriveFromApi();

  return (
    <>
      <h2>Welcome to the &#x1F608;</h2>
      <p>Here&apos;s what we&apos;ve been up to....</p>
      <Grid files={driveData.files} nextPageToken={driveData.nextPageToken} />
    </>
  );
};

export default Drive;
