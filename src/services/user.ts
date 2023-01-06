import { api } from './api';

async function uploadRequest(
  pathRequest: string,
  formData: FormData
): Promise<Response> {
  return await api.patch(pathRequest, formData, {
    headers: { 'content-type': 'multipart/form-data' },
  });
}

export async function updateUserRequest(formData: FormData) {
  await uploadRequest('/user/avatar', formData).then(async (response) => {});
}
