// pages/private/profile/hooks/useProfile.ts
import { useState, useEffect } from 'react';
import type { User } from '../types/profile.dto';
import { authService } from '../../../../services/authService';

export const useProfile = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to load profile';
                setError(errorMessage);
                console.error('Failed to fetch user:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    return {
        user,
        isLoading,
        error
    };
};