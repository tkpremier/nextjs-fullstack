import dbQuery from '@/_db/dev/dbQuery';
import { ExperienceDB } from '@/types/db/experience';

export const getExp = async (id?: number) => {
  const getExpQuery = id
    ? `SELECT * FROM
  exp WHERE id = $1 ORDER BY id DESC`
    : `SELECT * FROM
  exp ORDER BY id DESC`;
  const values = id ? [id] : [];
  try {
    const { rows: data } = await dbQuery.query<ExperienceDB>(getExpQuery, values);
    if (data[0] === undefined) {
      console.log('There are no job experiences');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return { data };
  } catch (error) {
    console.error('An error occurred fetching job experiences', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

export const updateExp = async (payload = []) => {
  const updateExpQuery = `UPDATE exp
    SET name = $1, description = $2
    WHERE id = $3
    returning *`;
  try {
    console.log('updateExpQuery: ', updateExpQuery);
    if (payload.length > 0) {
      const { rows: data } = await dbQuery.query(updateExpQuery, payload);
      if (data[0] === undefined) {
        console.log('Experience not updated');
        return { data: [] };
      }
      return { data };
    }
    throw new Error('No data provided from client');
  } catch (error) {
    console.error('An error occurred updating experiences', error);
    return error;
  }
};

export const createExp = async (payload = []) => {
  const createExpQuery = `INSERT INTO exp(name, description) VALUES($1, $2) returning *`;

  try {
    if (payload.length > 0) {
      const { rows: data } = await dbQuery.query(createExpQuery, payload);
      if (data[0] === undefined) {
        console.log('Experience not added');
        return { data: [] };
      }
      return { data };
    }
    throw new Error('No data provided from client');
  } catch (error) {
    console.error('An error occurred adding experiences', error);
    throw error;
  }
};
