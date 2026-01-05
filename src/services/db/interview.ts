import dbQuery from '@/_db/dev/dbQuery';
import { InterviewDB } from '@/types/db/interview';

export const getInterview = async () => {
  const getInterviewQuery = `SELECT * FROM
  interview ORDER BY date DESC`;
  try {
    const { rows: data } = await dbQuery.query<InterviewDB>(getInterviewQuery, []);
    if (data[0] === undefined) {
      console.log('There are no interviews');
      return { data: [] };
    }
    return { data };
  } catch (error) {
    console.error('An error occurred fetching interviews', error);
    return { data: [], error };
  }
};

export const updateInterview = async (payload = []) => {
  const updateInterviewQuery = `UPDATE interview
    SET company = $1, date = $2, retro = $3
    WHERE id = $4
    returning *`;
  try {
    if (payload.length > 0) {
      const { rows: data } = await dbQuery.query(updateInterviewQuery, payload);
      if (data[0] === undefined) {
        console.log('Interview not updated');
        return { data: [] };
      }
      return { data };
    }
    throw new Error('No data provided from client');
  } catch (error) {
    console.error('An error occurred updating interviews', error);
    return { data: [], error };
  }
};

export const createInterview = async (payload = []) => {
  const createInterviewQuery = `INSERT INTO interview(company, retro, date) VALUES($1, $2, $3) returning *`;

  try {
    if (payload.length > 0) {
      const { rows: data } = await dbQuery.query(createInterviewQuery, payload);
      if (data[0] === undefined) {
        console.log('Interview not added');
        return { data: [] };
      }
      return { data };
    }
    throw new Error('No data provided from client');
  } catch (error) {
    console.error('An error occurred adding interviews', error);
    throw error;
  }
};
