import { useState, useEffect, useCallback } from 'react';
import type { User } from '../types/profile.dto';
import { profileService } from '../services/profileService';


export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // Try to get user from the service
        const userData = profileService.getUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUser(profileService.getUser());
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = useCallback(async (fullName: string) => {
    setIsLoading(true);
    setError(null);

    const result = await profileService.updateUser({ fullName });
    
    if (result.success) {
      setUser(profileService.getUser());
    } else {
      setError(result.error || 'Failed to update profile');
    }
    
    setIsLoading(false);
    return result.success;
  }, []);

  return {
    user,
    error,
    isLoading,
    updateUser,
    setError,
  };
};