import { useContext } from 'react'

import { AuthSessionContext } from '@/context'

export const useAuthSession = () => useContext(AuthSessionContext)
