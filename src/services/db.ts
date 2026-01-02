import dbQuery from '@/_db/dev/dbQuery';

export const getExp = async () => {
  const getModelQuery = `SELECT * FROM
  exp ORDER BY id DESC`;
  try {
    const dbResponse = await dbQuery.query(getModelQuery, []);
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
