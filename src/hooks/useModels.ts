import { Model } from '@/types/db/model';
import handleResponse from '@/utils/handleResponse';
import { useCallback, useEffect, useState } from 'react';

type HookSetSignature = (url: string, options: RequestInit & { body?: Model }) => Promise<Model[]>;
type HookReturn = [Model[], HookSetSignature];

export const useModels = (): HookReturn => {
  const [models, setModels] = useState<Model[]>([]);
  const handleModels = useCallback(
    async (url: string, options: RequestInit & { body?: Model } = { method: 'GET' }) => {
      try {
        const request = await fetch(url, options);
        const response = await handleResponse(request);
        if (response instanceof Error) {
          throw response;
        }
        if (options.method === 'PUT') {
          setModels((prev: Model[]) => {
            const updatedModel = response.data[0];
            return prev.map(m => (m.id === updatedModel.id ? { ...(updatedModel as Model) } : m));
          });
          return { data: response.data[0] ? response.data : [] };
        }
        if (options.method === 'POST') {
          setModels((prev: Model[]) => [...prev, ...response.data]);
          return { data: response.data };
        }
        console.log('handleModels response: ', response);
        setModels(response);
        return { data: response } as { data: Model[] } | Error;
      } catch (error) {
        return error;
      }
    },
    [setModels]
  );
  useEffect(() => {
    handleModels('/api/model')
      .then(res => {
        console.log('res, data: ', res);
        return res;
      })
      .catch(err => console.log('model-provider-err: ', err));
  }, []);

  return [models, handleModels];
};
