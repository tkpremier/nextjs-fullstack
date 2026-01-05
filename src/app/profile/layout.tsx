import { UnauthenticatedFallback } from '@/components/UnauthenticatedFallback';
import { PropsWithChildren, Suspense } from 'react';

export default ({ children }: PropsWithChildren<{}>) => (
  <Suspense fallback={<UnauthenticatedFallback loginUrl={'/'} />}>{children}</Suspense>
);
