import { getInterview } from '@/services/db/interview';
import { Metadata } from 'next';
import { Interviews } from './Drawers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Interviews | TK Premier',
  description: "TK Premier's Interviews"
};

const InterviewPage = async () => {
  const { data, error } = await getInterview();
  if (error) {
    console.log('Page error: ', error);
  }
  return <Interviews interviews={data} />;
};

export default InterviewPage;
