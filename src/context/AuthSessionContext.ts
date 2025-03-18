import { createContext } from 'react'

import { AuthSessionContextValue } from '@/types'

export const AuthSessionContext = createContext<AuthSessionContextValue>(
  {} as AuthSessionContextValue
)
