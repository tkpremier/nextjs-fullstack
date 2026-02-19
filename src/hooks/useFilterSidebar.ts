import { FilterSidebarContext } from '@/context/FilterSidebar';
import { useContext } from 'react';

export const useFilterSidebar = () => {
  const context = useContext(FilterSidebarContext);
  if (context === undefined) {
    throw new Error('useFilterSidebar must be used within a FilterSidebarProvider');
  }
  return context;
};
