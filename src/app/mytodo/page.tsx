import React, { Suspense } from 'react';
import UserProfile from '../../components/UserProfile/UserProfile';
import TabBar from '../../components/common/TabBar';
import MainHeader from '../../components/header/MainHeader';
import MonthCalender from '../../components/Calender/MonthCalender';
import getQueryClient from '../../lib/getQueryClient/getQueryclient';
import { dehydrate } from '@tanstack/react-query';
import {
  getTodoListQueryFns,
  getTodohistoryFns,
} from '../../utils/queryFns/todoListQueryFns';
import { getUserInfo } from '../../service/auth';
import HydrateTodoList from '../../components/hydration/HydrateTodoList.clinet';
import moment from 'moment';

const MyTodo = async () => {
  const today = moment().format('YYYY-MM-DD');
  const yearMonth = moment().format('YYYY-MM');
  const queryclient = getQueryClient();

  await Promise.all([
    queryclient.prefetchQuery(['todoHistory', yearMonth], () =>
      getTodohistoryFns(yearMonth)
    ),
    queryclient.prefetchQuery(['todolist', today], () =>
      getTodoListQueryFns(today)
    ),
    queryclient.prefetchQuery(['userInfo'], () => getUserInfo()),
  ]);

  const dehydarate = dehydrate(queryclient);

  return (
    <>
      <div className='p-6 w-full min-h-screen flex flex-col'>
        <MainHeader option={'mytodo'} />
        <div className='flex flex-col grow'>
          <HydrateTodoList state={dehydarate}>
            <UserProfile />
            <MonthCalender today={today} yearMonth={yearMonth} />
          </HydrateTodoList>
        </div>
      </div>
      <TabBar />
    </>
  );
};

export default MyTodo;
