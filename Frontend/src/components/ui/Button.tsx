import React, { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/30 active:translate-y-0',
    outline: 'bg-transparent text-gray-700 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95',
    danger: 'bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 active:scale-95',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} font-semibold rounded-xl transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;