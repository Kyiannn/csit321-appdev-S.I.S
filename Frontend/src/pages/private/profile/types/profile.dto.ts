// pages/private/profile/types/profile.dto.ts

export interface User {
    username: string;
    email: string;
}

// User list response
export interface UserListResponse {
    users: User[];
}

export type UpdateUserRequest = Partial<Pick<User, 'username' | 'email'>>;

export type UserResponse = User;

export const createDefaultUser = (): User => ({
    username: '',
    email: ''
});

export interface ProfileValidationDTO {
    username: {
        required: boolean;
        minLength: number;
        maxLength: number;
    };
    email: {
        required: boolean;
        pattern: string;
    };
}

export const profileValidation: ProfileValidationDTO = {
    username: {
        required: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        required: true,
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
    },
};