import { API_BASE_URL, HttpError } from "../utils/http"

export const authService = {
    login: async function(loginRequest: LoginRequest):Promise<void> {
        const response = await fetch(API_BASE_URL + "/api/auth/login",{
            headers: { 'Content-Type': 'application/json'},
            method:"POST",
            body: JSON.stringify(loginRequest),
            credentials:'include'
        })
        
        if(!response.ok){
            throw new HttpError(response.status,"Account does not exist!")
        }
    },

    register: async function(registerRequest: RegisterRequest):Promise<void> {
        const response = await fetch(API_BASE_URL + "/api/auth/register",{
            headers: { 'Content-Type': 'application/json'},
            method:"POST",
            body: JSON.stringify(registerRequest),
            credentials:'include'
        })
        
        if(!response.ok){
            throw new HttpError(response.status,"Account Already Exists!")
        }
    },
}

// TODO: cleanup later

type LoginRequest = {
    email: string, 
    password: string
}

type RegisterRequest = {
    username: string,
    email: string,
    password: string
}