'use client';
import { FilterSidebarProvider } from '@/context/FilterSidebar';
import { ReactNode } from 'react';
import { FilterSidebar } from './FilterSidebar';

export const FilterSidebarProviderWrapper = ({ children }: { children: ReactNode }) => (
  <FilterSidebarProvider>
    {children}
    <FilterSidebar />
  </FilterSidebarProvider>
);
