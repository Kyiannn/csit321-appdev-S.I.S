/**
* authService - Authentication and user management service
* 
* Handles all API calls related to auth and user operations
* Uses cookies for session management (credentials: 'include')
*/
import { API_BASE_URL, HttpError } from "../utils/http"
 
export const authService = {
    /**
     * Login user
     * @param {LoginRequest} loginRequest - { email, password }
     * @throws {HttpError} On invalid credentials
     */
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
 
    /**
     * Register new user
     * @param {RegisterRequest} registerRequest - { username, email, password }
     * @throws {HttpError} On duplicate email or validation error
     */
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
 
    /**
     * Logout user - clears session cookie
     * @throws {HttpError} On logout failure
     */
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
 
    /**
     * Get current logged-in user
     * @returns {Promise<UserResponse>} { username, email }
     * @throws {HttpError} On unauthorized or fetch failure
     */
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
 
    /**
     * Update current user
     * @param {UpdateUserRequest} updateData - { username?, email? }
     * @returns {Promise<UserResponse>} Updated user data
     * @throws {HttpError} On update failure
     */
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
 
    /**
     * Delete current user account
     * @throws {HttpError} On deletion failure
     */
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
 
    /**
     * Get all registered users
     * @returns {Promise<{ users: UserResponse[] }>} List of all users
     * @throws {HttpError} On fetch failure
     */
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
 
// ============================================================
// Types
// ============================================================
 
/** Login request payload */
type LoginRequest = {
    email: string
    password: string
}
 
/** Register request payload */
type RegisterRequest = {
    username: string
    email: string
    password: string
}
 
/** User response from server */
export interface UserResponse {
    username: string
    email: string
}
 
/** Update user request payload */
export interface UpdateUserRequest {
    username?: string
    email?: string
}