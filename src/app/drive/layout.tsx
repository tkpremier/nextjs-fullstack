import { FilterSidebarProviderWrapper } from '@/components/drive/FilterSidebarProviderWrapper';
import { ModelProvider } from '@/context/model';
import { PropsWithChildren } from 'react';

export default ({ children }: PropsWithChildren<{}>) => (
  <FilterSidebarProviderWrapper>
    <ModelProvider>{children}</ModelProvider>
  </FilterSidebarProviderWrapper>
);
