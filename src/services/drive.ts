import { drive } from '@/lib/google-auth';
import { DriveFile } from '@/types/drive';

export const listFiles = async (pageToken = '', pageSize = 1000) => {
  try {
    const res = await drive.files.list({
      pageSize,
      fields:
        'nextPageToken, files(description, kind, id, name, createdTime, mimeType, name, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, videoMediaMetadata, viewedByMeTime, size)',
      pageToken
    });
    return res;
  } catch (e) {
    console.error('err: ', e);
  }
};

export const deleteDriveFile = async (driveId: string) => {
  const res = await drive.files.delete({
    fileId: driveId
  });
  return res;
};

export const updateFile = async (driveId: string, data: Partial<DriveFile>) => {
  const res = await drive.files.update({
    fileId: driveId,
    requestBody: data
  });
  return res;
};

export const getFile = async (driveId: string) => {
  const fetchFile = await drive.files.get({
    fileId: driveId,
    fields:
      'description, kind, id, name, createdTime, mimeType, name, parents, spaces, imageMediaMetadata, webViewLink, webContentLink, thumbnailLink, createdTime, videoMediaMetadata, viewedByMeTime, size'
  });
  return fetchFile;
};

export const getUser = async () => {
  const user = await drive.about.get({ fields: 'user' });
  return user;
};

export const getMultipleFiles = async (fileIds: string[]) => {
  const filePromises = fileIds.map(fileId =>
    drive.files.get({
      fileId: fileId,
      fields: 'id, name, mimeType, size' // Specify the fields you need
    })
  );

  try {
    const results = await Promise.all(filePromises);
    return results.map(res => res.data);
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};
