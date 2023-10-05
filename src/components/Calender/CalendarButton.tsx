import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import TodayTier1 from '../../../public/images/TodayTier1.svg';
import TodayTier2 from '../../../public/images/TodayTier2.svg';
import TodayTier3 from '../../../public/images/TodayTier3.svg';
import TodayTier0 from '../../../public/images/TodayTier0.svg';

type Props = {
  day: moment.Moment;
  currentMonth: moment.Moment;
  currentDate: moment.Moment;
  historyData: any[];
  selectDate: (day: moment.Moment) => void;
};

const CalendarButton: React.FC<Props> = ({
  day,
  currentMonth,
  currentDate,
  historyData,
  selectDate,
}) => {
  const isCurrentMonth = day.month() === currentMonth.month();
  const isCurrentDate = day.isSame(currentDate, 'day');
  const matchingTier = historyData.find((tier: any) =>
    day.isSame(moment(tier.dueDate, 'YYYY-MM-DD'), 'day')
  );

  const getImageForTier = (step: number) => {
    switch (step) {
      case 0:
        return TodayTier0; // step이 0인 경우 이미지를 로드하지 않음
      case 1:
        return TodayTier1; // step이 1인 경우 TodayTier1 이미지 로드
      case 2:
        return TodayTier2; // step이 2인 경우 TodayTier2 이미지 로드
      case 3:
        return TodayTier3; // step이 3인 경우 TodayTier3 이미지 로드
      default:
        return null; // 다른 step 값에 대한 처리 (옵션)
    }
  };

  return (
    <button
      className={`flex z-0 justify-center items-center border relative ${
        isCurrentMonth ? '' : 'text-[#535252]'
      } ${isCurrentDate ? 'relative' : ''}`}
      onClick={() => selectDate(day)}
    >
      {matchingTier && (
        <Image
          className='absolute z-1 top-[1px]'
          width={20}
          height={20}
          src={getImageForTier(matchingTier.step)}
          alt='TodoTier'
          key={matchingTier.id}
        />
      )}
      <p className='z-20 text-sm'>{day.format('D')}</p>
      {isCurrentDate && isCurrentMonth && (
        <span className='absolute top-[-6px] h-[5px] w-[5px] rounded-full bg-main-color'></span>
      )}
    </button>
  );
};

export default CalendarButton;
