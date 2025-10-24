import { createContext } from 'react'

export type CurrentTab = string | undefined

export const currentTabContext = createContext<CurrentTab>(undefined)
