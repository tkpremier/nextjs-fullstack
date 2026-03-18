'use client';
import { useModels } from '@/hooks/useModels';
import { Model } from '@/types/db/model';
import { createContext, PropsWithChildren } from 'react';

export const ModelContext = createContext<[Model[], (url: string, options: RequestInit & { body?: Model }) => Promise<Model[]> | undefined]>(
  [
    [] as unknown as Model[], () => new Promise((resolve) => {
      resolve([])
    })]);

export const ModelProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [models, handleModels] = useModels();
  return <ModelContext.Provider value={[models, handleModels]}>
    {children}
  </ModelContext.Provider>;
};
