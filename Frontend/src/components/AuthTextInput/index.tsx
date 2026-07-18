import { type InputHTMLAttributes } from "react"

interface AuthTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    status: 'success' | 'error' | 'loading' | 'normal'
}

function AuthTextInput({ status, ...props }: AuthTextInputProps) {
    return (
        <input 
            {...props}
            className={
                "text-white rounded-md px-4 py-2 outline-none bg-[#34353B] w-full " + 
                (status === 'error' ? 'border border-red-500' : '')
            } 
        />
    )
}

export default AuthTextInput