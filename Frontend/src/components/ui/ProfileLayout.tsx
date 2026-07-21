import React, { type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

interface ProfileLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backPath?: string;
  className?: string;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  children,
  title = 'Profile',
  subtitle = '',
  showBackButton = true,
  backPath = '/dashboard',
  className = '',
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <div className={`bg-white rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl transition-transform duration-300 hover:scale-[1.02] relative ${className}`}>
        {showBackButton && (
          <button
            onClick={() => navigate(backPath)}
            className="absolute top-4 left-4 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {title && (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
              {title}
            </h1>
            {subtitle && (
              <span className="text-gray-500 text-center block mb-3">{subtitle}</span>
            )}
            <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 my-5" />
          </>
        )}

        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;