'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import {
  getKakaoUser,
  postKakaoLogin,
  sendKakaoToken,
} from '../../service/kakao-login';
import { setCookie } from '../action';

const KakaoLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const kakaoLoginMutation = useMutation((code: string | string[]) =>
    postKakaoLogin(code)
  );

  useEffect(() => {
    if (code && !kakaoLoginMutation.isLoading) {
      kakaoLoginMutation.mutate(code);
    }
  }, [code]);

  useEffect(() => {
    const handleKakaoLoginSuccess = async () => {
      if (kakaoLoginMutation.isSuccess) {
        const kakaoAccesstoken = kakaoLoginMutation.data.access_token;

        try {
          const kakaoResponse = await getKakaoUser(kakaoAccesstoken);
          localStorage.setItem('kakaoName', kakaoResponse.properties.nickname);

          const response = await sendKakaoToken(kakaoAccesstoken);
          const { refreshToken } = response;

          setCookie([{ key: 'refreshToken', value: refreshToken }]);
          router.push('/mytodo');
        } catch (error) {
          console.log(error);
        }
      }
    };
    if (!kakaoLoginMutation.isError) {
      handleKakaoLoginSuccess();
    }
  }, [
    kakaoLoginMutation.isSuccess,
    kakaoLoginMutation.data,
    router,
    kakaoLoginMutation,
  ]);

  return (
    <div className='flex justify-center items-center h-screen'>로그인중...</div>
  );
};

export default KakaoLogin;
