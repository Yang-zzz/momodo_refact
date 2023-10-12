'use client';

import React, { useState, useMemo } from 'react';
import moment from 'moment';
import leftArrow from '../../../public/images/left-arrow.svg';
import rightArrow from '../../../public/images/right-arrow.svg';
import Image from 'next/image';
import TodoList from '../Todo/TodoList.client';
import CalendarWeek from './CalendarWeek';
import { generateCalendarData } from '../../utils/dateDataCreate';
import { useCombinedDataFetch } from '../../hooks/useQueryDataFetch';

type Props = {
  today: string;
  yearMonth: string;
};

const MonthCalendar: React.FC<Props> = ({ today, yearMonth }) => {
  const [currentMonth, setCurrentMonth] = useState(moment(yearMonth));
  const [selectedDate, setSelectedDate] = useState(today);
  const [moveMonth, setMoveMonth] = useState(yearMonth);
  const currentDate = moment();
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const { todoListData, historyData } = useCombinedDataFetch(
    selectedDate,
    moveMonth
  );

  // 이전 달로 이동하는 함수
  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    setMoveMonth(currentMonth.subtract(1, 'months').format('YYYY-MM'));
  };

  // 다음 달로 이동하는 함수
  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, 'month'));
    setMoveMonth(currentMonth.add(1, 'months').format('YYYY-MM'));
  };

  // 현재 월의 캘린더 데이터를 생성하는 함수
  const calendarData = useMemo(()=> generateCalendarData(currentMonth),[currentMonth]);

  // 클릭한 날짜 추출 (day type 수정 필요)
  const selectDate = (day: any) => {
    const selectedDay = moment(day).format('YYYY-MM-DD');
    setSelectedDate(selectedDay);
  };
  return (
    <>
      <section className='bg-grey-2D rounded-3xl px-5 py-4'>
        <div className='flex items-center justify-between pb-3'>
          <span className='text-sm'>{currentMonth.format('YYYY년 MM월')}</span>
          <div className='relative top-1'>
            <button onClick={goToPreviousMonth} className=''>
              <Image src={leftArrow} alt='이전 버튼' />
            </button>
            <button onClick={goToNextMonth} className='ml-5'>
              <Image src={rightArrow} alt='다음 버튼' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-7 gap-3 text-center'>
          {weekdays.map((weekday, index) => (
            <div key={index} className='text-sm text-[#ADADAD] font-bold'>
              {weekday}
            </div>
          ))}
          {calendarData.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              <CalendarWeek
                week={week}
                currentMonth={currentMonth}
                currentDate={currentDate}
                historyData={historyData}
                selectDate={selectDate}
              />
            </React.Fragment>
          ))}
        </div>
      </section>
      <TodoList selectedDate={selectedDate} todoListData={todoListData} />
    </>
  );
};

export default MonthCalendar;
