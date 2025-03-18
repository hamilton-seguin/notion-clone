import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/supabaseClient'

import { AuthSessionContext } from '@/context/AuthSessionContext'

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
      if (data.session) {
        setSession(data.session)
      } else {
        console.error(error)
      }
    }
    auth()
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })
  }, [])

  return (
    <AuthSessionContext.Provider value={{ session, loading }}>
      {children}
    </AuthSessionContext.Provider>
  )
}