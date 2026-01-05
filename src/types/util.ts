export type OptionalAll<Type> = {
  [Property in keyof Type]?: string | number | Array<number>;
};

export type DbResponse<T = Record<string, unknown>> = {
  rows: Array<T>;
};
