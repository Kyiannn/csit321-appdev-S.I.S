import { API_BASE_URL } from "../utils/http"
import { HttpError } from "../utils/http"

const landingService = {
    logout: async ():Promise<void> => {
        
            const response = await fetch(API_BASE_URL + "/api/landing/logout",{
                headers: { 'Content-Type': 'application/json'},
                method:"POST",
                credentials:'include'
            })
            if(!response.ok){
                throw new HttpError(response.status,response.statusText);
            }

    },
    me: async ():Promise<MeResponse> => {
        const response = await fetch(API_BASE_URL + "/api/landing/me",{
            headers: { 'Content-Type': 'application/json'},
            method:"GET",
            credentials:'include'
        })
                
        if(!response.ok){
            throw new HttpError(response.status,"Failed to get user info")
        }
        const data = await response.json() as MeResponse
        return data
    },
} 

export default landingService

export type MeResponse = {
    username: string,
    email: string,
    activityStatus: 'available' | 'away' | 'do not disturb' | 'offline'
}

export const defaultMeResponse : MeResponse = {
    username: '',
    email: '',
    activityStatus: 'offline'
}

