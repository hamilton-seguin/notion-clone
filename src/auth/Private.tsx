import { ReactElement } from 'react'
import { Navigate } from 'react-router'

import { useAuthSession } from '@/hooks'

export const Private = ({ component }: { component: ReactElement }) => {
  const { session, loading } = useAuthSession()
  if (loading) return <>Authenticating...</>
  return session ? component : <Navigate to="/auth" />
}
