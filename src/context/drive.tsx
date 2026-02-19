'use client';
import { DBData, DBDataResponse, DriveHandler, DriveResponse } from '@/types';
import handleResponse from '@/utils/handleResponse';
import camelCase from 'lodash/camelCase';
import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';

export const DriveContext = createContext<[DriveResponse, DriveHandler<DriveResponse>]>([
  { data: [] } as DriveResponse,
  () => Promise.resolve({ data: [] } as { data: DBData[] } | Error)
]);

export const DriveProvider = ({ children, source }: PropsWithChildren<{ source: string }>) => {
  const [drive, setDrive] = useState<DriveResponse>({ data: [] } as DriveResponse);
  const getDrive = useCallback(
    async (url: string, options: RequestInit = { method: 'GET', credentials: 'include' }) => {
      try {
        const response = await handleResponse(await fetch(url, options));
        if (response instanceof Error) {
          throw response;
        }
        if (options.method === 'PUT') {
          const updatedDrive = Object.keys(response.data[0]).reduce(
            (
              obj:
                | (DBData & { [key: string]: string | number | null | Array<number> })
                | { [key: string]: string | number | null | Array<number> | undefined | Date },
              keys: string
            ) => {
              obj[camelCase(keys)] = response.data[0][keys];
              return obj;
            },
            {} as DBData & { [key: string]: string | number | null | Array<number> | undefined | Date }
          ) as DBData;
          setDrive((prev: DBDataResponse) => ({ data: prev.data.map(d => (d.id === response.data[0].id ? response.data[0] : d)) }));
          return { data: [updatedDrive] } as { data: DBData[] } | Error;

        }
        console.log('drive api response: ', response);
        setDrive({ data: response.data });
        return { data: response.data };
      } catch (error) {
        return error;
      }
    },
    [setDrive]
  );
  useEffect(() => {
    getDrive(
      source === 'drive-db'
        ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/drive-list`
        : `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/drive-google`
    );
  }, []);
  return <DriveContext.Provider value={[drive, getDrive]}>{children}</DriveContext.Provider>;
};
