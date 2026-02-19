import { getInterview } from '@/services/db/interview';
import { Metadata } from 'next';
import { Interviews } from './Drawers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Interviews | TK Premier',
  description: "TK Premier's Interviews"
};

const InterviewPage = async () => {
  const { data } = await getInterview();
  return <Interviews interviews={data} />;
};

export default InterviewPage;
