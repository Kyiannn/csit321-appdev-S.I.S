import type { User, UpdateUserRequest } from '../types/profile.dto';
import { createDefaultUser } from '../types/profile.dto';
import { authService } from '../../../../services/authService';

class ProfileService {
    private static instance: ProfileService;
    private user: User;
    private isLoading: boolean = false;
    private error: string | null = null;

    private constructor() {
        this.user = createDefaultUser();
    }

    static getInstance(): ProfileService {
        if (!ProfileService.instance) {
            ProfileService.instance = new ProfileService();
        }
        return ProfileService.instance;
    }

    async fetchUser(): Promise<User> {
        try {
            this.isLoading = true;
            this.error = null;
            const userData = await authService.getCurrentUser();
            this.user = userData;
            return this.user;
        } catch (error) {
            this.error = error instanceof Error ? error.message : 'Failed to fetch user';
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    getUser(): User {
        return { ...this.user };
    }

    async updateUser(updateData: UpdateUserRequest): Promise<User> {
        try {
            this.isLoading = true;
            this.error = null;
            const updatedUser = await authService.updateUser(updateData);
            this.user = updatedUser;
            return this.user;
        } catch (error) {
            this.error = error instanceof Error ? error.message : 'Failed to update user';
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    async deleteUser(): Promise<void> {
        try {
            this.isLoading = true;
            this.error = null;
            await authService.deleteUser();
            this.user = createDefaultUser();
        } catch (error) {
            this.error = error instanceof Error ? error.message : 'Failed to delete user';
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    getLoading(): boolean {
        return this.isLoading;
    }

    getError(): string | null {
        return this.error;
    }

    reset(): void {
        this.user = createDefaultUser();
        this.error = null;
        this.isLoading = false;
    }
}

export const profileService = ProfileService.getInstance();