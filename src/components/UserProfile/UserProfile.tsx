'use client';

import Image from 'next/image';
import tierIcon1 from '../../../public/images/tierIcon-red-1.svg';
import tierIcon2 from '../../../public/images/tierIcon-green-2.svg';
import tierIcon3 from '../../../public/images/tierIcon-blue-3.svg';
import tierIcon4 from '../../../public/images/tierIcon-rainbow-4.svg';
import ProfileCard from './ProfileCard';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../service/auth';
import { useMemo } from 'react';

const UserProfile: React.FC = () => {
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
    <section className='flex items-center justify-between mb-4'>
      <h1 className='hidden'>유저 프로필</h1>
      <ProfileCard
        userId={userInfoData?.userId}
        name={userInfoData?.name}
        profileImage={userInfoData?.profileImage}
        introduce={userInfoData?.introduce}
      />
      <div className='flex flex-col items-center justify-around'>
        <Image
          width={40}
          height={40}
          src={tierIconSrc}
          alt='티어 단계'
          className='ml-auto'
        />
        <span className='text-xxs mt-2'>{tierLevel}</span>
      </div>
    </section>
  );
};

export default UserProfile;
