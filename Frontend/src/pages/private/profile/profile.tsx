import React from 'react';
import { useNavigate } from 'react-router';
import { ProfileLayout, Avatar } from '../../../components/ui';
import { useProfile } from './hooks/useProfile';
import { mapUserToResponseDTO } from './utils/profile.mapper';
import ProfileBio from './components/ProfileBio';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useProfile();
  
  // Map user to response DTO
  const profile = user ? mapUserToResponseDTO(user) : null;

  if (!profile) {
    return (
      <ProfileLayout showBackButton backPath="/dashboard">
        <div className="text-center py-8">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout showBackButton backPath="/dashboard">
      <Avatar initials={profile.initials} />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
        {profile.fullName}
      </h1>
      <span className="text-gray-500 text-center block mb-5">{profile.email}</span>

      <ProfileBio bio={profile.bio} />

      <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 my-5" />

      <div className="flex justify-center">
        <button
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/30 active:translate-y-0 w-full sm:w-auto"
          onClick={() => navigate('/edit-profile')}
        >
          Edit Profile
        </button>
      </div>
    </ProfileLayout>
  );
};

export default ProfilePage;