import React from 'react';
import cx from 'clsx';
import Image from 'next/image';

interface ButtonType {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  leftIcon?: string;
  rightIcon?: string;
  type: 'button' | 'submit' | 'reset';
  pirmary?: boolean;
  border?: boolean;
  remove?: boolean;
}

const Button: React.FC<ButtonType> = ({
  className,
  children,
  onClick,
  leftIcon,
  rightIcon,
  type,
  pirmary,
  border,
  remove,
}) => {
  return (
    <button
      type={type}
      className={cx(
        'inline-flex justify-center items-center py-3 px-6 gap-2 rounded-xl transition-all',
        {
          'text-white bg-purple-600 text-base outline-none capitalize disabled:brightness-50 hover:brightness-75':
            pirmary,
          'border-solid border-2 text-purple-600 rounded-2xl border-purple-600 hover:text-white hover:bg-purple-600 transition-all':
            border,
          'text-white bg-purple-600 text-base outline-none capitalize disabled:brightness-50 hover:bg-red-600':
            remove,
        },
        className,
      )}
      onClick={onClick}>
      {leftIcon && <Image width={20} height={20} src={leftIcon} alt='Icon' />}

      {children}

      {rightIcon && <Image width={20} height={20} src={rightIcon} alt='Icon' />}
    </button>
  );
};

export default Button;
