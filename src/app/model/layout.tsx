import { ModelProvider } from '@/context/model';
import { PropsWithChildren } from 'react';

const ModelPageLayout = ({ children }: PropsWithChildren<unknown>) => <ModelProvider>{children}</ModelProvider>;
export default ModelPageLayout
