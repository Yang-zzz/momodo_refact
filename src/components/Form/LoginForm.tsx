'use client';

import Button from '../button/Button';
import Input from '../common/Input';
import Label from '../common/Label';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { postUserLogin } from '../../service/auth';
import { useRouter } from 'next/navigation';
import { setCookie } from '../../app/action';

export interface LoginInput {
  userId: string;
  password: string;
}

const LoginForm: React.FC = ({}) => {
  const [inputValue, setInputValue] = useState<LoginInput>({
    userId: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const isInputValue = !inputValue.userId || !inputValue.password;

  const loginMutation = useMutation(postUserLogin, {
    onSuccess(data) {
      const { refreshToken } = data;
      setCookie([{ key: 'refreshToken', value: refreshToken }]);
      router.push('/mytodo');
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.userId) {
      return setErrorMsg('아이디를 입력해주세요.');
    }
    if (!inputValue.password) {
      return setErrorMsg('비밀번호를 입력해주세요.');
    }
    loginMutation.mutate(inputValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col relative h-full w-full'
    >
      <h1 className='text-2xl text-center py-8'>로그인</h1>
      <span className='ml-4'>
        <p> 테스트용 ID : testYang1</p>
        <p> 테스트용 PW : 123456</p>
      </span>
      <Label htmlFor='userId' labelText='아이디'>
        <Input
          type='text'
          id='userId'
          placeholder='아이디를 입력하세요'
          onChange={handleChange}
        />
      </Label>
      <Label htmlFor='password' labelText='비밀번호'>
        <Input
          type='password'
          id='password'
          placeholder='비밀번호를 입력하세요'
          onChange={handleChange}
        />
      </Label>
      <p className='pl-4 pt-2 text-sm text-main-color'>{errorMsg}</p>
      <div className='absolute bottom-7 w-full'>
        <Button buttonSize='large' disabled={isInputValue}>
          로그인
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
