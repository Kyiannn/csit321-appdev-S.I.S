import { Outlet } from "react-router";
import Background from "../../assets/auth_bg.png"

function AuthLayout(){
    return (
        <main className="w-screen h-screen flex justify-center items-center">
            <Outlet/>
            <div className="fixed w-full h-full bg-black/50 -z-10"/>
            <img src={Background} alt="bg_auth" className="flex w-full h-full fixed -z-20"/> 
        </main>
    )
}

export default AuthLayout;