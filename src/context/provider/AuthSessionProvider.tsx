import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'

import { supabase } from '@/supabaseClient'
import { AuthSessionContext } from '@/context'

export const AuthSessionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Failed to get session: ', error)
      }
      setSession(data.session)
      setLoading(false)
    }
    auth()
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setLoading(false)
      }
    )
    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthSessionContext.Provider value={{ session, loading }}>
      {children}
    </AuthSessionContext.Provider>
  )
}
