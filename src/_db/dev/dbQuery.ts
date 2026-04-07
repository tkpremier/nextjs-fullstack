import { QueryResult, QueryResultRow } from 'pg';
import pool from './pool';

function query<T extends QueryResultRow = any>(queryText: string, params: unknown[]): Promise<QueryResult<T>> {
  return new Promise((resolve, reject) => {
    pool
      .query<T>(queryText, params)
      .then((res: QueryResult<T>) => {
        resolve(res);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
}

const dbQuery = {
  query
};

export default dbQuery;
