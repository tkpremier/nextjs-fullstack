import { PropsWithChildren } from 'react';
import { FilterSidebarProviderWrapper } from '@/components/drive/FilterSidebarProviderWrapper';
import { DriveProvider } from '@/context/drive';
import { ModelProvider } from '@/context/model';

export default ({ children }: PropsWithChildren<{}>) => (
  <FilterSidebarProviderWrapper>
    <DriveProvider source="drive">
      <ModelProvider>{children}</ModelProvider>
    </DriveProvider>
  </FilterSidebarProviderWrapper>
);
