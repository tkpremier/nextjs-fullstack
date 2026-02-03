export type DriveRowIdentifier = { id: string; drive_id: string };

export type DriveIdentifier = string | number;

export type DriveInsertValue = string | number | null | Array<number>;

export type DriveDB = {
  id: string;
  driveId: string;
  type: string;
  name: string;
  description?: string;
  webViewLink: string;
  webContentLink?: string;
  thumbnailLink?: string;
  createdTime: string;
  lastViewed?: string | null;
  createdOn: string;
  duration?: number;
  modelId: Array<number>;
  size?: number;
};

export type DriveUpdatePayload = Record<string, string | number | null | Array<number>> & {
  id?: DriveIdentifier;
  driveId?: DriveIdentifier;
  drive_id?: DriveIdentifier;
};
