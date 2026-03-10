'use client';
import isNull from 'lodash/isNull';
import { Form } from './Form';

import { DBDataResponse, DriveHandler, DriveResponse, GoogleDriveAPIResponse } from '@/types';
import handleResponse from '@/utils/handleResponse';
import serialize from 'form-serialize';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

const updateDriveFileApi = async (
  driveId: string,
  options: RequestInit & { body?: Partial<GoogleDriveAPIResponse> } = {
    method: 'PATCH',
    credentials: 'include'
  } as RequestInit & { body?: Partial<GoogleDriveAPIResponse> }
) => {
  try {
    if (!driveId) {
      throw (new Error('Drive ID is required'));
    }
    const response = await handleResponse(
      await fetch(`/api/drive-google/${driveId}`, options)
    );
    if (response instanceof Error) {
      throw response;
    } else {
      return { data: response as GoogleDriveAPIResponse };
    }
  } catch (error) {
    return { data: {}, error };
  }
};

export const DriveFileView = ({
  source = 'drive-google',
  file,
  handleDriveAction
}: {
  source?: 'drive-db' | 'drive-google';
  file: GoogleDriveAPIResponse;
  handleDriveAction?: DriveHandler<DriveResponse>;
}) => {
  const [driveFile, setDriveFile] = useState<GoogleDriveAPIResponse>(file);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDriveFile(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = serialize(form, { hash: true }) as any;

      const options = {
        credentials: 'include' as unknown as RequestCredentials,
        method: source === 'drive-google' ? 'PATCH' : 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: source === 'drive-google' ? JSON.stringify(data) : JSON.stringify({ ...driveFile, ...data })
      };
      if (source === 'drive-google') {
        updateDriveFileApi(driveFile.id ?? '', options)
          .then(res => {
            if (res instanceof Error) {
              throw res;
            }
            const updatedFile = res.data as GoogleDriveAPIResponse;
            setDriveFile(f => ({ ...f, ...updatedFile }));
          })
          .catch(err => console.log('err: ', err));
        return;
      }
      if (source === 'drive-db') {
        handleDriveAction(`/api/drive-google/${driveFile?.id}`, options)
          .then(res => {
            if (!(res instanceof Error)) {
              const body: Partial<GoogleDriveAPIResponse> = {
                name: JSON.parse(options.body as string)?.name,
                description: JSON.parse(options.body as string)?.description
              };
              updateDriveFileApi(driveFile.id ?? '', { ...options, method: 'PATCH', body: JSON.stringify(body) })
                .then(googleResponse => {
                  if (googleResponse instanceof Error) {
                    throw googleResponse;
                  }
                  setDriveFile({ ...driveFile, ...googleResponse.data } as unknown as GoogleDriveAPIResponse);
                })
                .catch(err => {
                  console.error('DB Updated successfully, but google API not updated successfully.  err: ', err);
                  setDriveFile({
                    ...driveFile,
                    ...(res as DBDataResponse).data[0]
                  } as unknown as GoogleDriveAPIResponse);
                });
            }
          })
          .catch(err => console.log('err: ', err));
      }
    },
    [driveFile, handleDriveAction, source]
  );

  return !isNull(file) && file ? (
    <Form onSubmit={handleSubmit}>
      <h4>Update Drive Info</h4>
      <input type="text" name="name" value={driveFile.name ?? ''} onChange={handleChange} />
      <input type="text" name="description" value={driveFile.description ?? ''} onChange={handleChange} />
      <input type="submit" value="Update" />
    </Form>
  ) : null;
};
