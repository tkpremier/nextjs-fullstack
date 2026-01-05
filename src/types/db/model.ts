export type ModelDB = {
  id: number;
  name: string;
  platform: string;
  created_on: Date;
  drive_ids?: string[];
};

export type Model = Omit<ModelDB, 'created_on' | 'drive_ids'> & {
  createdOn: Date;
  driveIds: Array<string>;
};
