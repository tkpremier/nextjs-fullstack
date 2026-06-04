import { getDrive } from '@/services/db/drive';
import { Suspense } from 'react';
import Grid from './Grid';

const Loading = () => <div>Loading DriveDb</div>

const Drive = async () => {
  const response = await getDrive();

  const { data } = response;
  return (
    <>
      <h2>Welcome to the &#x1F608;</h2>
      <p>Here&apos;s what we&apos;ve been up to....</p>
      <Suspense fallback={<Loading />}>
        <Grid driveData={data} />
      </Suspense>
    </>
  );
};

export default Drive;
