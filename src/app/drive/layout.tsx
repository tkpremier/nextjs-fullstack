import { FilterSidebarProviderWrapper } from '@/components/drive/FilterSidebarProviderWrapper';
import { ModelProvider } from '@/context/model';
import { PropsWithChildren } from 'react';

const DrivePageLayout = ({ children }: PropsWithChildren<unknown>) => (
  <FilterSidebarProviderWrapper>
    <ModelProvider>{children}</ModelProvider>
  </FilterSidebarProviderWrapper>
);

export default DrivePageLayout
