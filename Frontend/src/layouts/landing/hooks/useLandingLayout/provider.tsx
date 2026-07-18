import { useState, type ReactNode, useCallback, useMemo } from "react";
import { LandingLayoutContext } from "./context";

function LandingProvider({ children }:{ children: ReactNode }){
    const [togglePopup, setTogglePopup] = useState(false)
    const handleTogglePopUp = useCallback(() => {
        setTogglePopup(prev => !prev);
    }, []);

    const [toggleSignOut, setToggleSignOut] = useState(false);
    
    // Stable function reference
    const handleToggleSignOut = useCallback(() => {
        setToggleSignOut(prev => !prev);
    }, []);

    // Memoize the object so it only changes if one of the dependencies changes
    const contextValue = useMemo(() => ({
        togglePopup,
        handleTogglePopUp,
        toggleSignOut,
        handleToggleSignOut
    }), [togglePopup, handleTogglePopUp, toggleSignOut, handleToggleSignOut]);
    return (
        <LandingLayoutContext.Provider value={contextValue}>
            {children}
        </LandingLayoutContext.Provider>
    )
}

export default LandingProvider