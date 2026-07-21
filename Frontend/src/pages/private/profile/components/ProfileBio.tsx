import React from 'react';

interface ProfileBioProps {
  bio: string;
}

const ProfileBio: React.FC<ProfileBioProps> = ({ bio }) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-5 border border-purple-100">
      <p className="text-gray-700 text-sm leading-relaxed">"{bio}"</p>
    </div>
  );
};

export default ProfileBio;