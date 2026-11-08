import { createContext } from 'react'
import type { TAuthContext } from './auth.types'

export const AuthContext = createContext<TAuthContext | undefined>(undefined)
