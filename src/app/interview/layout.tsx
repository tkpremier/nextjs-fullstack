import { PropsWithChildren } from 'react';
import { InterviewProvider } from '@/context/interview';

export default ({ children }: PropsWithChildren<{}>) => <InterviewProvider>{children}</InterviewProvider>;
