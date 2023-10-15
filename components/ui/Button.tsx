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
  edit?: boolean;
  disabled?: boolean;
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
  edit,
  disabled,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cx(
        'inline-flex justify-center items-center py-3 px-6 gap-2 rounded-xl transition-all disabled:bg-slate-400 disabled:text-white disabled:cursor-not-allowed',
        {
          'text-white bg-purple-600 text-base outline-none capitalize disabled:brightness-50 hover:brightness-75':
            pirmary,
          'border-solid border-2 text-purple-600 rounded-2xl border-purple-600 hover:text-white hover:bg-purple-600 transition-all':
            border,
          'py-3 px-3 text-white bg-purple-600 text-base outline-none capitalize disabled:brightness-50 hover:bg-red-600':
            remove,
          'py-3 px-3 text-white bg-purple-600 text-base outline-none capitalize disabled:brightness-50 hover:brightness-75':
            edit,
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
