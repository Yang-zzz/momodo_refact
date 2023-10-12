import Image from 'next/image';
import loading from '../../public/images/loading.gif';
import React from 'react';

export default function Loading() {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <Image src={loading} width={50} height={50} alt='로딩중 이미지' />
      <p className='mt-2'>Loading...</p>{' '}
    </div>
  );
}
