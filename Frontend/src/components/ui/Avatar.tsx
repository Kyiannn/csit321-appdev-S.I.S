import React from 'react';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  initials, 
  size = 'lg', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-xl',
    md: 'w-20 h-20 text-2xl',
    lg: 'w-24 h-24 sm:w-28 sm:h-28 text-3xl sm:text-4xl',
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-500/30 ${className}`}
    >
      <span className="text-white font-semibold select-none">{initials}</span>
    </div>
  );
};

export default Avatar;