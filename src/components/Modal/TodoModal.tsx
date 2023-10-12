import React, { ReactNode, useRef } from 'react';
import TodoForm from '../Form/TodoForm';

interface ModalProps {
  children?: ReactNode;
  type?: string | null;
  closeModal(): void;
  id: number;
  selectedDate:string;
}

const Modal: React.FC<ModalProps> = ({ children, type, closeModal, id, selectedDate }) => {
  return (
    <article className='bg-grey-44 z-10 w-full fixed bottom-0 left-0 rounded-tr-3xl rounded-tl-3xl pb-10 {type===null ? pb-0 : pb-10}'>
      <h2 className='hidden'>모달창</h2>
      {type === 'newtodo' || type === 'edittodo' ? (
        <TodoForm id={id} type={type} closeModal={closeModal} selectedDate={selectedDate} />
      ) : (
        <>
          <span className='block w-1/5 h-1 bg-grey-65 rounded-md mx-auto mt-4 mb-8' />
          <div className='w-full flex flex-col'>{children}</div>
        </>
      )}
    </article>
  );
};

export default Modal;
