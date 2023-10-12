'use client';

import Image from 'next/image';
import React, { useMemo } from 'react';
import Todo from './Todo.client';
import todayTodos from '../../../public/images/today-todos.svg';
import AddButton from '../button/AddButton';
import useModal from '../../hooks/useModal';
import Modal from '../Modal/TodoModal';
import { TodoData } from '../../types/todolistType';
import moment from 'moment';

interface Props {
  todoListData?: TodoData[];
  selectedDate: string;
}
const calculateIsDueDatePassed = (
  dueDate: string,
  currentDate: string
): boolean => {
  return moment(dueDate).isBefore(currentDate, 'day');
};

const TodoList: React.FC<Props> = ({ todoListData, selectedDate }) => {
  const { modalOpen, openModal, closeModal } = useModal();
  const currentDate = moment().format('YYYY-MM-DD');

  const processedTodoListData = useMemo(
    () =>
      todoListData?.map((todoList) => ({
        ...todoList,
        isDueDatePassed: calculateIsDueDatePassed(
          todoList.dueDate,
          currentDate
        ),
      })),
    [todoListData, currentDate]
  );

  return (
    <section className={`mt-8 flex flex-col grow`}>
      <h2 className='hidden'>투두리스트</h2>
      <div className='flex justify-between items-center relative mb-4'>
        <Image src={todayTodos} className='ml-1 mr-3' alt='오늘의 투두리스트' />
        <span className='text-x mr-auto'>{selectedDate}</span>
        <AddButton
          openModal={openModal}
          todayDate={currentDate}
          selectedDate={selectedDate}
        />
      </div>
      <div
        className={`w-full my-3 h-1 overflow-y-auto bg-grey-2D rounded-3xl px-5 py-5 flex flex-col grow ${
          processedTodoListData?.length === 0
            ? 'flex justify-center items-center'
            : ''
        }`}
      >
        {processedTodoListData?.length === 0 ? (
          <div className='flex-col flex justify-center items-center'>
            <AddButton
              openModal={openModal}
              todayDate={currentDate}
              selectedDate={selectedDate}
            />
            <p className='text-white my-5'>생성된 todolist가 없습니다.</p>
            <p className='text-white mb-2'>
              {' '}
              위 버튼을 눌러 todolist를 생성하세요!
            </p>
          </div>
        ) : (
          <ul>
            {processedTodoListData?.map((todoList) => (
              <Todo
                todoList={todoList}
                key={todoList.id}
                isDueDatePassed={todoList.isDueDatePassed}
                selectedDate={selectedDate}
              />
            ))}
          </ul>
        )}
      </div>
      {modalOpen && (
        <Modal
          type='newtodo'
          closeModal={closeModal}
          id={0}
          selectedDate={selectedDate}
        />
      )}
    </section>
  );
};

export default TodoList;
