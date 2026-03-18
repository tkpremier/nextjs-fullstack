import { QueryResult } from 'pg';
import pool from './pool';

function query(queryText: string, params: any[]): Promise<QueryResult> {
  return new Promise((resolve, reject) => {
    pool
      .query(queryText, params)
      .then((res: QueryResult) => {
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
