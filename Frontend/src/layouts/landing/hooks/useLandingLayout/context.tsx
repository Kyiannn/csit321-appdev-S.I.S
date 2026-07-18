import { createContext } from "react";
import type { LandingContextType } from "./type";

export const LandingLayoutContext = createContext<LandingContextType | undefined>(undefined)