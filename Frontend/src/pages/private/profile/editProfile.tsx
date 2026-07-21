import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ProfileLayout, Avatar, InputField, Button } from '../../../components/ui';
import { useProfile } from './hooks/useProfile';
import { ProfileValidationService } from './utils/profile.validation';

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser, error, setError, isLoading } = useProfile();
  
  const [fullName, setFullName] = useState(user.fullName);
  const [bio, setBio] = useState(user.bio);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const validationResult = ProfileValidationService.validateAll({
      fullName,
      email: user.email,
      bio,
    });

    if (!validationResult.isValid) {
      setError(Object.values(validationResult.errors).join(', '));
      return;
    }

    const success = await updateUser(fullName, bio);
    if (success) {
      navigate('/profile');
    }
  };

  return (
    <ProfileLayout 
      title="Edit Profile" 
      subtitle="Update your information"
      backPath="/dashboard"
    >
      <Avatar initials={user.initials} />

      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField
          id="fullName"
          label="Full Name"
          value={fullName}
          onChange={setFullName}
          placeholder="Enter your full name"
          required
          validate={ProfileValidationService.validateFullName}
          maxLength={50}
        />

        <InputField
          id="email"
          label="Email"
          value={user.email}
          onChange={() => {}}
          disabled
        />

        <InputField
          id="bio"
          label="Bio"
          type="textarea"
          value={bio}
          onChange={setBio}
          placeholder="Tell us about yourself..."
          rows={4}
          showCharCount
          maxLength={500}
          validate={ProfileValidationService.validateBio}
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 my-5" />

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Button
            variant="outline"
            onClick={() => navigate('/profile')}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </ProfileLayout>
  );
};

export default EditProfilePage;