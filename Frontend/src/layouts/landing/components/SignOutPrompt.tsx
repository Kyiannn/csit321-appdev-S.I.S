import LoadingSpinner from "../../../components/LoadingSpinner";
import useLandingLayout from "../hooks/useLandingLayout/hook";
import useSignOut from "../hooks/useSignout/hook";

function SignOutPrompt() {
    return (
        <div className="fixed z-20 w-screen h-screen bg-black/50 bottom-0 top-0 left-0 right-0 justify-center items-center flex">
            <div className="flex flex-col gap-4 border border-[#645D68] text-white bg-[#17161D] p-4 rounded-xl w-100 h-60 items-center justify-center">
                <h1>Are you sure you want to sign out?</h1>
                <SignOutBody />
            </div>
        </div>
    );
}

function SignOutBody() {
    const { state, handleSignOut } = useSignOut();
    const { handleToggleSignOut } = useLandingLayout()
    if (state === "loading") {
        return (
            <div className="flex flex-row gap-2 justify-center items-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="flex flex-row gap-2 justify-center items-center">
            <button 
                onClick={handleSignOut} 
                className="flex rounded-2xl bg-[#6C1CD7] text-white px-4 py-2 w-25 cursor-pointer items-center justify-center"
            >
                yes
            </button>

            <button 
                onClick={handleToggleSignOut} 
                className="flex rounded-2xl border border-[#6C1CD7] text-white px-4 py-2 w-25 cursor-pointer items-center justify-center"
            >
                No
            </button>
        </div>
    );
}

export default SignOutPrompt;