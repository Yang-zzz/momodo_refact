'use client';
import React from 'react';
import ProfileImg from './ProfileImg';

interface ProfileCardProps {
  userId: string;
  name: string;
  profileImage: string;
  introduce: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  profileImage,
  introduce,
}) => {
  return (
    <div className='flex items-center'>
      <ProfileImg
        width={35}
        height={35}
        alt='프로필 이미지'
        src={profileImage}
        type={''}
      />
      <div className='flex flex-col ml-2'>
        <p className='leading-tight text-sm'>{name}</p>
        <span className={`text-xxs text-grey-C9`}>{introduce}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
