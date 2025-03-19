import { FormEvent, useState } from 'react'
import { Navigate } from 'react-router'

import { Loader } from '@/components'

import { supabase } from '@/supabaseClient'
import { useAuthSession } from '@/hooks'

export const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const { session, loading: authLoading } = useAuthSession()

  if (authLoading) return <Loader />

  if (session) return <Navigate to="/" />

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: 'http://localhost:5173/',
        }
      })
      if (error) throw new Error(`Failed to send magic link: ${error}`)
      if (data) alert('Magic link sent: check your emails')
    } catch (error) {
      console.error('Error sending magic link: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="w-96 px-4 py-6 bg-white dark:bg-zinc-700 rounded-lg shadow-lg flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Notion Clone App</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            Sending magic link...
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 -mt-2 border border-light-border rounded-lg placeholder:text-light-border"
            />
            <button
              type="submit"
              className="w-full p-2 bg-orange-100 hover:bg-orange-200/60 text-light-text dark:text-dark-text dark:bg-gray-900 hover:dark:bg-gray-900/70 rounded-lg cursor-pointer"
            >
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
