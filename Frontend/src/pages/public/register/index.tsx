import { Link } from "react-router"
import LoadingSpinner from "../../../components/LoadingSpinner"
import useRegister from "../register/hooks/useRegister/hook"
import { ShieldAlert } from "lucide-react"
import AuthTextInput from "../../../components/AuthTextInput"

function RegisterPage() {
    const { register, handleChange, handleSubmit, errorMessage } = useRegister()

    return (
        <div className="flex flex-col gap-4 rounded-xl bg-[#17161D] border border-[#423D44] w-100 h-150 text-white justify-center items-center p-10 ">
            <h1 className="text-4xl font-bold">Join S.I.S!</h1>
            <p className="font-extralight">Create an account to get started.</p>

            {errorMessage.length > 0 && (
                <div className="p-4 gap-2 w-full bg-red-500 rounded-xl flex flex-row items-center">
                    <ShieldAlert /> {errorMessage}
                </div>
            )}

            <AuthTextInput
                status={register.status}
                type="text"
                placeholder="username" 
                name="username" 
                value={register.username}
                onChange={handleChange}
            />

            <AuthTextInput
                status={register.status}
                type="email"
                placeholder="email" 
                name="email" 
                value={register.email}
                onChange={handleChange}
            />

            <AuthTextInput
                status={register.status}
                type="password" 
                placeholder="password" 
                name="password" 
                value={register.password}
                onChange={handleChange}
            />

            <button 
                onClick={handleSubmit} 
                className="cursor-pointer bg-violet-500 text-white rounded-md w-full px-4 py-2 flex justify-center items-center"
            >
                {register.status === 'loading' ? <LoadingSpinner /> : "Register"}
            </button>

            <span className="w-full flex justify-start gap-2 items-center">
                Already have an account? <Link to={"/login"} className="text-violet-500">login</Link>
            </span>
        </div>
    )
}

export default RegisterPage