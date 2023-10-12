import newtodo from '../../../public/images/newtodoIcon.svg';
import edittodo from '../../../public/images/edittodo.svg';
import close from '../../../public/images/closeIcon.svg';
import Image from 'next/image';
import Button from '../button/Button';
import TodoEmoji from '../Todo/TodoEmoji';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  modifyTodoData,
  postTodoData,
  deleteTodoData,
  getIdTodoData,
} from '../../service/todo';
import { useQueryClient } from '@tanstack/react-query';

interface TodoFormProps {
  type: string;
  closeModal(): void;
  id: number;
  selectedDate: string;
}

export interface TodoData {
  id?: number;
  title: string;
  emoji: string;
  dueDate: string;
  repeatDays?: string;
  duration?: string;
  completed?: boolean;
}
export interface ModifyTodo {
  title: string;
  emoji: string;
  repeatDays?: string;
  duration?: string;
}

const TodoForm: React.FC<TodoFormProps> = ({
  type,
  closeModal,
  id,
  selectedDate,
}) => {
  // State
  //TODO: 실제 유저가 선택한 날짜와 연결해주기
  const [todoValue, setTodoValue] = useState('');
  const [todoEmoji, setTodoEmoji] = useState('🎉');
  const [repeatDays, setRepeatDays] = useState('');
  const [duration, setDuration] = useState('0');
  const queryClient = useQueryClient();

  const getIdTodo = async () => {
    const data = await getIdTodoData(id);
    setTodoValue(data.title);
    setTodoEmoji(data.emoji);
    setRepeatDays(data.repeatDays || '');
    setDuration(data.duration || '0');
  };
  useEffect(() => {
    if (type === 'edittodo') {
      getIdTodo();
    }
  }, [type]);

  // Constants
  const curretDate = moment().format('YYYY-MM-DD');
  console.log("re-rendering");
  const selectDayOfWeek = [
    { value: '1', name: '월요일 마다' },
    { value: '2', name: '화요일 마다' },
    { value: '3', name: '수요일 마다' },
    { value: '4', name: '목요일 마다' },
    { value: '5', name: '금요일 마다' },
    { value: '6', name: '토요일 마다' },
    { value: '7', name: '일요일 마다' },
  ];
  const selectWeek = [
    { value: '0', name: '안 함' },
    { value: '7', name: '1주' },
    { value: '14', name: '2주' },
    { value: '21', name: '3주' },
    { value: '28', name: '4주' },
  ];
  const daysOfWeek = ['없음', '월', '화', '수', '목', '금', '토', '일'];

  // Event Handlers
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const handleRepeatDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === '안 함') {
      setRepeatDays('');
    } else if (repeatDays.includes(selectedValue)) {
      const updatedDays = repeatDays.replace(selectedValue, '');
      setRepeatDays(updatedDays);
    } else {
      setRepeatDays((prevRepeatDays) => prevRepeatDays + selectedValue);
    }
  };

  const handleDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === '안 함') {
      setDuration('');
    } else {
      setDuration(selectedValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todoData: TodoData = {
      title: todoValue,
      emoji: todoEmoji,
      dueDate: selectedDate,
      repeatDays: repeatDays,
      duration: duration,
    };
    try {
      if (type === 'newtodo') {
        await addMutation.mutateAsync(todoData);
        setTodoValue('');
      } else if (type === 'edittodo') {
        await ModifyMutation.mutateAsync();
        setTodoValue('');
      }
    } catch (error) {
      console.log('투두 추가 에러' + error);
    }
  };

  const addMutation = useMutation(postTodoData, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolist'] });
    },
  });

  const modifyTodo: ModifyTodo = {
    title: todoValue,
    emoji: todoEmoji,
    repeatDays: repeatDays,
    duration: duration,
  };
  const ModifyMutation = useMutation(() => modifyTodoData(id, modifyTodo), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolist'] });
    },
  });

  return (
    <article>
      <h2 className='hidden'>투두 추가 모달</h2>
      <div className='flex relative mt-4 mb-10'>
        <Image
          src={type === 'newtodo' ? newtodo : edittodo}
          alt='투두모달'
          className='mx-auto my-0'
        />
        <button className='absolute right-4' onClick={closeModal}>
          <Image src={close} alt='닫기 버튼' />
        </button>
      </div>
      <TodoEmoji setTodoEmoji={setTodoEmoji} />
      {/* TodoList 입력  */}
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Todo를 입력해주세요'
          className='bg-grey-65 rounded-lg text-xs px-3 py-2 w-4/6 mb-3'
          value={todoValue}
          onChange={handleTodoChange}
        />
        {/* 반복요일 선택 */}
        <div className='flex flex-col gap-3 mb-10'>
          <div className='flex items-center'>
            <p className='text-xs bg-grey-65 px-3 py-2 rounded-lg mr-2'>
              반복 요일
            </p>
            <select
              className='bg-grey-65 rounded-lg pl-28 pr-3 py-2 text-right text-xs'
              onChange={handleRepeatDay}
              value={repeatDays}
            >
              <option value='안 함'>안 함</option>
              {selectDayOfWeek.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.name}
                </option>
              ))}
            </select>
            {repeatDays !== '' && (
              <div className='ml-2 text-xs'>
                {repeatDays
                  .split('')
                  .map((value: any) => daysOfWeek[value])
                  .join(', ')}
              </div>
            )}
            {/* 반복주간 선택 */}
          </div>
          <div className='flex items-center'>
            <p className='text-xs bg-grey-65 px-3 py-2 rounded-lg mr-2'>
              반복 주간
            </p>
            <select
              className='bg-grey-65 rounded-lg pl-28 pr-3 py-2 text-right text-xs'
              onChange={handleDuration}
              value={duration}
            >
              {selectWeek.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* type 따른 Button 모음 */}
        {type === 'newtodo' ? (
          <Button disabled={todoValue.length === 0}>추가하기</Button>
        ) : (
          <Button disabled={todoValue.length === 0}>수정하기</Button>
        )}
      </form>
    </article>
  );
};

export default TodoForm;
