import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { ProfileLayout, Avatar } from '../../../components/ui';
import { useProfile } from './hooks/useProfile';
import { mapUserToResponseDTO } from './utils/profile.mapper';
import { authService } from '../../../services/authService';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useProfile();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  
  // Map user to response DTO
  const profile = user ? mapUserToResponseDTO(user) : null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);

    try {
      // Call logout API - cookies will be cleared by the server
      await authService.logout();
      
      // Close confirmation modal
      setShowLogoutConfirm(false);
      
      // Navigate to login
      navigate('/login');
      
    } catch (error) {
      console.error('Logout error:', error);
      setLogoutError(error instanceof Error ? error.message : 'Failed to logout');
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!profile) {
    return (
      <ProfileLayout showBackButton={false}>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <>
      <ProfileLayout showBackButton={false}>
        <Avatar initials={profile.initials} />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
          {profile.fullName}
        </h1>
        <span className="text-gray-500 text-center block mb-5">{profile.email}</span>

        <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 my-5" />

        <div className="flex flex-col gap-3">
       
          
          <button
            onClick={() => setShowLogoutConfirm(true)}
            disabled={isLoggingOut}
            className="px-8 py-3 bg-red-500 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30 active:translate-y-0 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>

        {logoutError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {logoutError}
          </div>
        )}
      </ProfileLayout>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;