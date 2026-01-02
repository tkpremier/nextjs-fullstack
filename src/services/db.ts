import dbQuery from '@/_db/dev/dbQuery';

export const getExp = async () => {
  const getExpQuery = `SELECT * FROM
  exp ORDER BY id DESC`;
  try {
    const dbResponse = await dbQuery.query(getExpQuery, []);
    const data = dbResponse.rows;
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

export const getInterview = async () => {
  const getInterviewQuery = `SELECT * FROM
  interview ORDER BY date DESC`;
  try {
    const { rows } = await dbQuery.query(getInterviewQuery, []);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no interviews');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return { data: dbResponse };
  } catch (error) {
    console.log('An error occurred fetching interviews', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
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
