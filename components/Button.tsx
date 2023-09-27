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
}) => {
  return (
    <button
      type={type}
      className={cx(
        'inline-flex justify-center items-center py-4 px-8 gap-2 rounded-xl transition-all',
        {
          'text-white bg-green-600 text-base outline-none capitalize disabled:brightness-50 hover:brightness-75':
            pirmary,
          'border-solid border-2 text-green-600 rounded-2xl border-green-600 hover:text-white hover:bg-green-600 transition-all':
            border,
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
