'use client';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../service/auth';
import tierIcon1 from '../../../public/images/tierIcon-red-1.svg';
import tierIcon2 from '../../../public/images/tierIcon-green-2.svg';
import tierIcon3 from '../../../public/images/tierIcon-blue-3.svg';
import tierIcon4 from '../../../public/images/tierIcon-rainbow-4.svg';

const Tier = () => {
  const { data: userInfoData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
    staleTime: 10 * 10 * 2000,
  });
  const tierIconSrc = useMemo(() => {
    if (userInfoData?.tier === 'RED') {
      return tierIcon1;
    } else if (userInfoData?.tier === 'GREEN') {
      return tierIcon2;
    } else if (userInfoData?.tier === 'BLUE') {
      return tierIcon3;
    } else if (userInfoData?.tier === 'RAINBOW') {
      return tierIcon4;
    }
    return '';
  }, [userInfoData]);

  const tierLevel = useMemo(() => {
    if (userInfoData?.tier === 'RED') {
      return 'LV.1';
    } else if (userInfoData?.tier === 'GREEN') {
      return 'LV.2';
    } else if (userInfoData?.tier === 'BLUE') {
      return 'LV.3';
    } else if (userInfoData?.tier === 'RAINBOW') {
      return 'LV.4';
    }
    return '';
  }, [userInfoData]);

  return (
    <div className='flex items-center justify-around py-5 px-5 mb-7 bg-grey-2D rounded-xl'>
      <Image
        src={tierIconSrc}
        alt='티어 레벨'
        width={50}
        height={50}
        className='ml-2 mr-6'
      />
      <div className='grow'>
        <div className='flex mb-2 justify-between'>
          <span className='text-xs'>{tierLevel}</span>
          <span className='text-xs'>💪 30% 달성</span>
        </div>
        <div className='w-full h-4 border-solid border-white border-2 rounded'>
          <div className='h-full progressbar' style={{ width: `${40}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Tier;
