import { instance, accessInstance } from './axios-api';
import { LoginInput } from '../app/login/page';
import { InputValue } from '../components/SignupForm';

export const postSignup = async (formdata: InputValue) => {
  const response = await instance.post('/api/v1/user-app', formdata);
  return response.data;
};

export const postUserLogin = async (formdata: LoginInput) => {
  const response = await instance.post(
    '/api/v1/authentication/token',
    formdata
  );

  return response.data.data;
};

export const getUserInfo = async () => {
  const response = await accessInstance.get(`/api/v1/user-app`);
  return response.data.data;
};

// any Type 수정필요
export const putUserProfile = async (editdata:any) => {
  const response = await accessInstance.put('/api/v1/user-app', editdata);
  return response;
};

export const putRefreshToken = async (token: string | undefined) => {
  const response = await instance.put('/api/v1/authentication/token', token);
  return response.data.data;
};
