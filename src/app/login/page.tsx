import React, { useState } from 'react';
import LoginForm from '../../components/Form/LoginForm';

export interface LoginInput {
  userId: string;
  password: string;
}

const Login = () => {
  return (
    <section className='p-6 pb-16 flex flex-col justify-between h-screen w-full'>
      <LoginForm />
    </section>
  );
};

export default Login;
