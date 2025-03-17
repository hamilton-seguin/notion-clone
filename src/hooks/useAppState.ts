import { useContext, createContext } from "react"

import  { AppStateContextT } from "@/types"

export const AppStateContext = createContext<AppStateContextT>({} as AppStateContextT)

export const useAppState = () => useContext(AppStateContext)