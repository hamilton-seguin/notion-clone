import { useState } from 'react'
import { Navigate } from 'react-router'

import { useAuthSession } from '@/hooks'

export const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const { session } = useAuthSession()

  if (session) <Navigate to="/" />

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <div className="w-96 px-4 py-6 bg-white dark:bg-zinc-700 rounded-lg shadow-lg flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Notion Clone App</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            Sending magic link...
          </div>
        ) : (
          <form>
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
              onClick={() => {
                setLoading(true)
              }}
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
