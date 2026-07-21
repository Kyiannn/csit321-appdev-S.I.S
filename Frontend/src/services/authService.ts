// services/authService.ts
import { API_BASE_URL, HttpError } from "../utils/http"

export const authService = {
    login: async function(loginRequest: LoginRequest): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(loginRequest),
            credentials: 'include'
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new HttpError(response.status, errorData.message || "Account does not exist!")
        }
    },

    register: async function(registerRequest: RegisterRequest): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(registerRequest),
            credentials: 'include'
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new HttpError(response.status, errorData.message || "Account Already Exists!")
        }
    },

    logout: async function(): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            credentials: 'include'
        })
        
        if (!response.ok) {
            throw new HttpError(response.status, "Logout failed!")
        }
    },

    // Updated to match your backend endpoint: /api/user/me
    getCurrentUser: async function(): Promise<UserResponse> {
        const response = await fetch(`${API_BASE_URL}/api/user/me`, {
            headers: { 'Content-Type': 'application/json' },
            method: "GET",
            credentials: 'include'
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new HttpError(response.status, errorData.message || "Failed to get user data")
        }
        
        return await response.json();
    },

    // Update user - if your backend supports it
    updateUser: async function(updateData: UpdateUserRequest): Promise<UserResponse> {
        const response = await fetch(`${API_BASE_URL}/api/user/me`, {
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
            body: JSON.stringify(updateData),
            credentials: 'include'
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new HttpError(response.status, errorData.message || "Failed to update user")
        }
        
        return await response.json();
    },

    deleteUser: async function(): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/api/user/me`, {
            headers: { 'Content-Type': 'application/json' },
            method: "DELETE",
            credentials: 'include'
        })
        
        if (!response.ok) {
            throw new HttpError(response.status, "Failed to delete account")
        }
    },
    getAllUsers: async function(): Promise<{ users: UserResponse[] }> {
        const response = await fetch(`${API_BASE_URL}/api/user/get/all`, {
            headers: { 'Content-Type': 'application/json' },
            method: "GET",
            credentials: 'include'
        })
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new HttpError(response.status, errorData.message || "Failed to get users")
        }
        
        return await response.json();
    },

}

// Types
type LoginRequest = {
    email: string, 
    password: string
}

type RegisterRequest = {
    username: string,
    email: string,
    password: string
}

// Updated to match your UserDTO
export interface UserResponse {
    username: string;
    email: string;
}

export interface UpdateUserRequest {
    username?: string;
    email?: string;
}