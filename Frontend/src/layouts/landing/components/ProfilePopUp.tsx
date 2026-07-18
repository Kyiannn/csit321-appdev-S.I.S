import { CircleAlert, LogOut, UserCircle } from "lucide-react"
import useProfilePopup from "../hooks/useProfilePopup/hook"
import useLandingLayout from "../hooks/useLandingLayout/hook"
import LoadingSpinner from "../../../components/LoadingSpinner"

function ProfilePopUp(){
    const { currentUser,handleStatusChange } = useProfilePopup()
    const { handleToggleSignOut } = useLandingLayout()
    const { activityStatus,email, username } = currentUser.data
    return (
        <div className="p-2 rounded-2xl border border-[#645D68] bg-[#17161D] w-80 z-10 fixed bottom-20 left-20 text-white">
            {currentUser.status === 'loading' ? (<ProfileLoading/>) : currentUser.status === 'error' ? (<ProfileError/>) : (
                <div className="flex flex-row gap-2 items-center px-4 py-2 w-full">
                    <UserCircle size={40}/> {/* TODO: change to actual user profile */}
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold">{username === "" ? 'default user' : username }</h1>
                        <p className="font-extralight text-xs">{email === "" ? 'default@user.com' : email}</p>
                    </div>
                </div>
            )}
            <div>
                <ProfilePopUpButton name={'available'} onClick={handleStatusChange}>
                    <span className="flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-green-500" />
                        Available 
                    </span>
                    {activityStatus === 'available' && <StatusCapsule/>}
                </ProfilePopUpButton>

                <ProfilePopUpButton name={'away'} onClick={handleStatusChange}>
                    <span className="flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-yellow-500" />
                        Away 
                    </span>
                    {activityStatus === 'away' && <StatusCapsule/>}
                </ProfilePopUpButton>

                <ProfilePopUpButton name={'do not disturb'} onClick={handleStatusChange}>
                    <span className="flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-red-500" />
                        Do not Disturb 
                    </span>
                    {activityStatus === 'do not disturb' && <StatusCapsule/>}
                </ProfilePopUpButton>

                <ProfilePopUpButton name={'offline'} onClick={handleStatusChange}>
                    <span className="flex items-center gap-4">
                        <span className="w-3 h-3 rounded-full bg-gray-500" />
                        Offline 
                    </span>
                    {activityStatus === 'offline' && <StatusCapsule/>}
                </ProfilePopUpButton>

                <button 
                    onClick={handleToggleSignOut}
                    className="text-[#FF0202] text-xs flex flex-row justify-between hover:bg-[#FF0202]/25 rounded-md w-full cursor-pointer px-4 py-2 gap-2 items-center h-12">
                    <h1> Sign Out </h1> <LogOut/>
                </button>


            </div>
        </div>
    )
}

function StatusCapsule(){
    return (
        <div className="px-3 py-1 rounded-xl text-xs bg-[#6C1CD7]"> Current </div>
    )
}

function ProfilePopUpButton({...props}){
    return (
        <button {...props} className="flex flex-row justify-between text-xs hover:bg-[#6C1CD7]/50 rounded-md w-full cursor-pointer px-4 py-2 gap-2 items-center h-10">{props.children}</button>
    )
}

function ProfileError(){
    return (
        <div className="flex flex col gap-2 justify-center items-center px-4 py-2 w-full">
            <CircleAlert color="red"/>
            <h1>failed to fetch data</h1>
        </div>
    )
}

function ProfileLoading(){
    return (
        <div className="flex flex col gap-2 justify-center items-center px-4 py-2 w-full">
            <LoadingSpinner/>
        </div>
    )
}


export default ProfilePopUp