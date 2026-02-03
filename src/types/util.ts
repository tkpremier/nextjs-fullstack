export type DbResponse<T = Record<string, unknown>> = {
  rows: Array<T>;
};
