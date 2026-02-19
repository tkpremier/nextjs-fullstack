'use client';

import { Interview } from '@/types';
import handleResponse from '@/utils/handleResponse';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

export const InterviewContext = createContext<
  [Interview[], (url: string, options?: RequestInit & { body?: Interview }) => Promise<{ data: Interview[] } | Error>]
>([[], () => Promise.resolve({ data: [] } as { data: Interview[] } | Error)]);

export const InterviewProvider = ({ children }) => {
  const [response, setInterviews] = useState<{ data: Interview[] }>({ data: [] });
  const handleInterviews = useCallback(
    async (url: string, options?: RequestInit & { body?: Interview }) => {
      try {
        const apiResponse = await handleResponse(await fetch(url, options));
        if (apiResponse instanceof Error) {
          console.error('handleInterviews error: ', apiResponse);
          throw apiResponse;
        }
        if (options?.method === 'PUT' || options?.method === 'POST') {
          const updatedInterview = apiResponse.data as Interview;
          setInterviews(({ data }) => ({
            data: data.map(i => (i.id === updatedInterview.id ? updatedInterview : i))
          }));
          return { data: [updatedInterview] };
        }
        setInterviews({ data: apiResponse.data });
        return { data: apiResponse.data };
      } catch (error) {
        console.error('handleInterviews error: ', error);
        return error;
      };
    },
    [setInterviews]
  );
  useEffect(() => {
    handleInterviews(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/interview`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const data = useMemo(
    () =>
      response.data.map((d: Interview) => ({ ...d, date: new Date(d.date).toLocaleDateString() as unknown as Date })),
    [response.data]
  );
  return <InterviewContext.Provider value={[data, handleInterviews]}>{children}</InterviewContext.Provider>;
};
