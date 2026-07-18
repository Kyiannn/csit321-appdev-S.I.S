import { Link } from "react-router"
import LoadingSpinner from "../../../components/LoadingSpinner"
import useLogin from "./hooks/useLogin/hook"
import {  ShieldAlert } from "lucide-react"
import AuthTextInput from "../../../components/AuthTextInput"

function LoginPage() {
    const {login, handleChange, handleSubmit, errorMessage} = useLogin()
    return (
            <div className="flex flex-col gap-4 rounded-xl bg-[#17161D] border border-[#423D44] w-100 h-140 text-white justify-center items-center p-10 ">
                <h1 className="text-4xl font-bold">Welcome to S.I.S!</h1>
                <p className="font-extralight">We’re  so excited to see you again!</p>

                {errorMessage.length > 0 && 
                <div className="p-4 gap-2 w-full bg-red-500 rounded-xl flex flex-row">
                    <ShieldAlert/> {errorMessage}
                </div>
                }
                <AuthTextInput
                    status={login.status}
                    type="email"
                    placeholder="email" 
                    name="email" 
                    value={login.email}
                    onChange={handleChange}
                />
                <AuthTextInput
                    status={login.status}
                    type="password" 
                    placeholder="password" 
                    name="password" 
                    value={login.password}
                    onChange={handleChange}
                />

                <button onClick={handleSubmit} className="cursor-pointer flex bg-violet-500 text-white rounded-md w-full px-4 py-2 justify-center items-center">
                    {login.status === 'loading' ? <LoadingSpinner/> : "Login"}
                </button>

                <span className="w-full flex justify-start gap-2 items-center">Already have an account? <Link to={"/register"} className="text-violet-500">register</Link></span>

            </div>
    )
}

export default LoginPage