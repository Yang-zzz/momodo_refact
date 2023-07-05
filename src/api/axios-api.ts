import { LoginInput } from './../pages/login';
import axios from 'axios';
import { InputValue } from '../components/SignupForm';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const BASE_URL = 'http://3.86.91.142:8080';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const accessInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

accessInstance.interceptors.request.use(
  async (config: any) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `JWT ${newAccessToken}`,
        };
      }
    } else {
      config.headers = {
        ...config.headers,
        Authorization: `JWT ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AccessToken 재발급
const refreshAccessToken = async (): Promise<string | null> => {
  const token = cookies.get('refreshtoken');

  if (!token) {
    window.location.href = '/login';
    alert('다시 로그인해주세요.');
  }

  try {
    const response = await instance.put('/api/v1/authentication/token', {
      token,
    });

    // TODO: 추후 access토큰 만료시 변경하기
    console.log(response.data);

    if (response.data?.response.accessToken) {
      const newAccessToken = response.data.response.accessToken;
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } else {
      // TODO: 새로운 accessToken을 받아오지 못한 경우 처리
      return null;
    }
  } catch (error) {
    // TODO: 요청 실패 또는 에러 발생 시 처리
    console.error('Failed to refresh accessToken:', error);
    return null;
  }
};

export const postSignup = async (formdata: InputValue) => {
  const response = await instance.post('/api/v1/user-app', formdata);
  return response.data;
};

export const postUserLogin = async (formdata: LoginInput) => {
  const response = await instance.post(
    '/api/v1/authentication/token',
    formdata
  );
  return response.data;
};
