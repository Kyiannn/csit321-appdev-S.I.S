
import { useEffect, useState, type ChangeEvent } from "react"
import landingService, { type MeResponse, defaultMeResponse } from "../../../../services/landingService"
import { HttpError } from "../../../../utils/http"

type ProfilePopUp = {
    data: MeResponse
    status: 'loading' | 'error' | 'idle'
}
function useProfilePopup(){

    const [currentUser,setCurrentUser] = useState<ProfilePopUp>({
        data: defaultMeResponse,
        status: 'idle'
    })
    useEffect(()=>{
        const load = async () => {
            try {
                setCurrentUser(prev => ({...prev,status:'loading'}))
                await new Promise(resolve => setTimeout(resolve, 1000)); 
                const response = await landingService.me()
                setCurrentUser({data:response, status:'idle'})
            } catch(error: unknown){
                if(error instanceof HttpError){
                    setCurrentUser({data:defaultMeResponse, status:'error'})
                }
            }
        }   
        load()
    },[])

    const handleStatusChange = (e : ChangeEvent<HTMLButtonElement>) => { 
        const { name } = e.target;
        // TODO: fix bugs and allow database update
        setCurrentUser(prev => ({...prev,activityStatus:name}))
    }   

    return {
        currentUser,
        handleStatusChange,
    }
}

export default useProfilePopup