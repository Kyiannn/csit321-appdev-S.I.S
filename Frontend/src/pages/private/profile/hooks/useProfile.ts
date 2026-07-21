import { useState, useCallback } from 'react';
import type { User } from '../types/profile.dto';
import { profileService } from '../services/profileService';

export const useProfile = () => {
  // Initialize state directly from the service
  const [user, setUser] = useState<User>(profileService.getUser());
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = useCallback(async (fullName: string, bio: string) => {
    setIsLoading(true);
    setError(null);

    const result = await profileService.updateUser({ fullName, bio });
    
    if (result.success) {
      setUser(profileService.getUser());
    } else {
      setError(result.error || 'Failed to update profile');
    }
    
    setIsLoading(false);
    return result.success;
  }, []);

  const resetUser = useCallback(async () => {
    await profileService.resetUser();
    setUser(profileService.getUser());
    setError(null);
  }, []);

  return {
    user,
    error,
    isLoading,
    updateUser,
    resetUser,
    setError,
  };
};