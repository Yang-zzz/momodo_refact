import axios from 'axios';
import { setCookie } from './../app/action';
import { getCookie } from '../app/action';
import { putRefreshToken } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const accessInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const accessInstanceProfile = axios.create({
  baseURL: BASE_URL,
});

accessInstance.interceptors.request.use(
  async (config) => {
    const refreshToken = await getCookie('refreshToken'); // 리프레시 토큰 가져오기

    if (!refreshToken) {
      // 사용자에게 로그인이 필요하다는 메시지 표시
      alert('로그인이 필요합니다.');
      return Promise.reject('로그인이 필요합니다.'); // 에러 처리를 위해 Promise.reject 사용
    }

    try {
      const response = await putRefreshToken(refreshToken);

      if (response.accessToken) {
        const newAccessToken = response.accessToken;
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return config;
      } else {
        // 엑세스 토큰 갱신에 실패한 경우에 대한 처리
        alert('엑세스 토큰 갱신에 실패했습니다.');
        return Promise.reject('엑세스 토큰 갱신에 실패했습니다.');
      }
    } catch (error) {
      // 갱신 요청 중 오류 발생 시 에러 처리
      // console.error('Failed to refresh accessToken:', error);
      alert('엑세스 토큰 갱신 중 오류가 발생했습니다.');
      return Promise.reject('엑세스 토큰 갱신 중 오류가 발생했습니다.');
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

accessInstanceProfile.interceptors.request.use(
  async (config) => {
    const refreshToken = await getCookie('refreshToken');

    if (!refreshToken) {
      // 사용자에게 로그인이 필요하다는 메시지 표시
      alert('로그인이 필요합니다.');
      return Promise.reject('로그인이 필요합니다.'); // 에러 처리를 위해 Promise.reject 사용
    }

    try {
      const response = await putRefreshToken(refreshToken);

      if (response.accessToken) {
        const newAccessToken = response.accessToken;
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return config;
      } else {
        // 엑세스 토큰 갱신에 실패한 경우에 대한 처리
        alert('엑세스 토큰 갱신에 실패했습니다.');
        return Promise.reject('엑세스 토큰 갱신에 실패했습니다.');
      }
    } catch (error) {
      // 갱신 요청 중 오류 발생 시 에러 처리
      // console.error('Failed to refresh accessToken:', error);
      alert('엑세스 토큰 갱신 중 오류가 발생했습니다.');
      return Promise.reject('엑세스 토큰 갱신 중 오류가 발생했습니다.');
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

accessInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: any) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      const token = await getCookie('refreshToken');
      const originalRequest = config;
      const newAccessToken = await putRefreshToken(token);
      if (newAccessToken) {
        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }
  }
);
