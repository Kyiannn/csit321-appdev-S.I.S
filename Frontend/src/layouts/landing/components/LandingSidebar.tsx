import { Home, UserCircle } from "lucide-react"
import SidebarButton from "./SidebarButton"
import useLandingLayout from "../hooks/useLandingLayout/hook"
import ProfilePopUp from "./ProfilePopUp"
import SignOutPrompt from "./SignOutPrompt"

function LandingSidebar(){
    const { togglePopup, handleTogglePopUp,toggleSignOut } = useLandingLayout()
    return (
        <div className="flex flex-col w-fit p-2 border border-r-[#423D44] h-full items-center justify-between">

            <div className="flex flex-col gap-2">
                <SidebarButton icon={Home} path="/dashboard"/>
            </div>


            {toggleSignOut && <SignOutPrompt/>}

            {togglePopup && (<ProfilePopUp/>)}
            <button className="rounded-full hover:bg-[#6C1CD7]/50 cursor-pointer p-4" onClick={handleTogglePopUp}>
                <UserCircle size={24} color={"white"}/> {/* TODO: change to profile picture later */}
            </button>
        </div>
    )
}



export default LandingSidebar
