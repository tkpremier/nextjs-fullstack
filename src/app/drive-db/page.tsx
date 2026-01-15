import { getDrive } from '@/services/db/drive';
import Grid from './Grid';

const Drive = async () => {
  const response = await getDrive();

  const { data } = response;
  return (
    <>
      <h2>Welcome to the &#x1F608;</h2>
      <p>Here&apos;s what we&apos;ve been up to....</p>
      <Grid driveData={data} />
    </>
  );
};

export default Drive;
