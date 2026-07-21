import { API_BASE_URL, HttpError } from "../utils/http"

export const authService = {
    login: async function(loginRequest: LoginRequest): Promise<void> {
        const response = await fetch(API_BASE_URL + "/api/auth/login", {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(loginRequest),
            credentials: 'include' // This ensures cookies are sent and received
        })
        
        if (!response.ok) {
            throw new HttpError(response.status, "Account does not exist!")
        }
    },

    register: async function(registerRequest: RegisterRequest): Promise<void> {
        const response = await fetch(API_BASE_URL + "/api/auth/register", {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(registerRequest),
            credentials: 'include'
        })
        
        if (!response.ok) {
            throw new HttpError(response.status, "Account Already Exists!")
        }
    },

    logout: async function(): Promise<void> {
        const response = await fetch(API_BASE_URL + "/api/auth/logout", {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            credentials: 'include' // This ensures the cookie is sent and can be cleared
        })
        
        if (!response.ok) {
            throw new HttpError(response.status, "Logout failed!")
        }
    }
}

type LoginRequest = {
    email: string, 
    password: string
}

type RegisterRequest = {
    username: string,
    email: string,
    password: string
}