'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import editTodo from '../../../public/images/editTodoIcon.svg';
import removeTodo from '../../../public/images/remove_icon.svg';
import { TodoData } from '../../types/todolistType';
import ToggleCheckButton from '../button/ToggleCheckButton';
import { todoCompleted, deleteTodoData } from '../../service/todo';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import useModal from '../../hooks/useModal';
import Modal from '../Modal/TodoModal';
import InnerModal from '../Modal/InnerModal';

interface Props {
  todoList: TodoData;
  isDueDatePassed: boolean;
  selectedDate:string;
}
const Todo: React.FC<Props> = ({ todoList, isDueDatePassed, selectedDate }) => {
  const { id, title, emoji, completed } = todoList;
  const [checked, setChecked] = useState(completed);

  const {
    modalOpen: editModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const {
    modalOpen: deleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();
  const queryClient = useQueryClient();

  const mutation = useMutation(() => todoCompleted(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todolist'] });
    },
  });

  const handleCompleted = async (checked: boolean) => {
    try {
      await mutation.mutateAsync();
      setChecked(checked);
    } catch (error) {
      console.log('에러' + error);
    }
  };

  return (
    <>
      <li
        className={`flex items-center relative ${
          checked ? `bg-[#656565]` : `bg-white`
        } p-3 mb-2 rounded-2xl`}
      >
        <span className='bg-[#E9E9E9] text-xxl w-11 h-11 rounded-xl text-center mr-3 ml-1'>
          {emoji}
        </span>
        <p className='text-black'>{title}</p>
        <div className='absolute right-4 pt-1'>
          {!checked && !isDueDatePassed && (
            <>
              <button className='mr-3' onClick={openEditModal}>
                <Image src={editTodo} alt='투두 수정' />
              </button>
              <button className='mr-3' onClick={openDeleteModal}>
                <Image src={removeTodo} alt='투두 삭제' />
              </button>
            </>
          )}
          {!isDueDatePassed && (
            <ToggleCheckButton toggled={checked} onToggle={handleCompleted} />
          )}
        </div>
      </li>
      {editModalOpen && (
        <Modal id={id} type='edittodo' closeModal={closeEditModal} selectedDate={selectedDate} />
      )}
      {deleteModalOpen && (
        <InnerModal type={'deleteTodo'} id={id} closeModal={closeDeleteModal} />
      )}
    </>
  );
};

export default Todo;
