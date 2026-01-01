import { PropsWithChildren } from 'react';
import { ModelProvider } from '@/context/model';

export default ({ children }: PropsWithChildren<{}>) => <ModelProvider>{children}</ModelProvider>;
