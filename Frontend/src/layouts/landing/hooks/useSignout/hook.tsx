import { useState } from "react"
import { useNavigate } from "react-router"

type SignOutState = 'loading' | 'error' | 'idle'

function useSignOut(){
    const navigate = useNavigate()
    const [state,setState] = useState<SignOutState>('idle')
    const handleSignOut = async () => {
        setState('loading')
        await new Promise(resolve => setTimeout(resolve, 300));
        // Local-only sign out, no backend call, no cookies/session
        navigate("/login")
    }

    return {
        state,
        handleSignOut
    }
}

export default useSignOut