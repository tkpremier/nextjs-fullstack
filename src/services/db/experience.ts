import dbQuery from '@/_db/dev/dbQuery';
import { ExperienceDB } from '@/types/db/experience';

export const getExp = async () => {
  const getExpQuery = `SELECT * FROM
  exp ORDER BY id DESC`;
  try {
    const { rows: data } = await dbQuery.query<ExperienceDB>(getExpQuery, []);
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
