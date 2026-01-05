import { QueryResult } from 'pg';
import pool from './pool';

function query<T extends unknown>(queryText: string, params: any[]): Promise<QueryResult<T>> {
  return new Promise((resolve, reject) => {
    pool
      .query(queryText, params)
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
