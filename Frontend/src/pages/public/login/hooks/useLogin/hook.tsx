import { useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router"

type LoginState = {
    email: string,
    password: string,
    status: 'success' | 'error' | 'loading' | 'normal'
}

const defaultLoginState : LoginState = {
    email: "",
    password: "",
    status: "normal"
}

function useLogin(){
    const navigate = useNavigate()
    const [login, setLogin] = useState(defaultLoginState)
    const [errorMessage, setErrorMessage] = useState("")
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setLogin(prev => ({...prev,[name]:value,status:'normal'}))
        setErrorMessage("")
    }

    const handleSubmit = async () => {
        const {email,password} = login
        
        try {
            if(email === "" || password === ""){
                throw new Error("fields should not be empty!")
            }

            if(!email.includes("@") || !email.includes(".")){
                throw new Error("email must be valid")
            }

            setLogin({...login,status:'loading'})
            await new Promise(resolve => setTimeout(resolve, 500));

            // Local-only check for now, no backend call, no cookies/session
            setLogin({...login,status:'success'})

            navigate('/profile')

        } catch (error: unknown) {
            if(error instanceof Error){
                setErrorMessage(error.message)
                setLogin({...login, status:'error'})
            }
            return
        }
    }

    return {
        login,
        handleChange,
        handleSubmit,
        errorMessage
    }
}

export default useLogin