import { updateExp } from '@/services/db/experience';

export async function updateExperience(formData: FormData) {
  'use server';
  try {
    const name = formData.get('name');
    const description = formData.get('description');
    const id = Number(formData.get('id'));
    const payload = [name, description, id];
    const response = await updateExp(payload);
    if (response instanceof Error) {
      throw response;
    }
    return response;
  } catch (error) {
    console.error('updateExperience action error: ', error);
    return error;
  }
}
