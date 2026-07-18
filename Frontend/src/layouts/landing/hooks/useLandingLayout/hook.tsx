import { use } from "react"
import { LandingLayoutContext } from "./context"

function useLandingLayout(){
    const context = use(LandingLayoutContext)
    if(!context){
        throw new Error("useLanding should be used within a LandingProvider")
    }
    return context
}

export default useLandingLayout