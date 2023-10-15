'use client';

import React, { ReactNode, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const modal = useRef<HTMLDivElement>(null);

  const onDissmiss = () => {
    router.push('/');
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modal.current) {
      onDissmiss();
    }
  };

  return (
    <div ref={modal} onClick={handleClose} className='modal'>
      <button onClick={onDissmiss} className='absolute top-4 right-5'>
        <Image src='/close.svg' width={20} height={20} alt='Close' />
      </button>
      <div className='modal_wrapper'>{children}</div>
    </div>
  );
};

export default Modal;
