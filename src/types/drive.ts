// Google API Drive File Types

export type DriveFile = {
  id: string;
  name: string;
  webViewLink: string;
  webContentLink: string;
  thumbnailLink: string;
  createdTime: string;
  lastViewed: string;
  description?: string;
  size?: string;
};

export type SyncStats = {
  created: number;
  updated: number;
  errors: number;
  processed: number;
  lastPageToken: string | null;
  deleted: number;
};
