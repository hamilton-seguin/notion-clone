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
      <div className="w-96 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Notion Clone App</h1>
        {loading ? (<div className='flex justify-center items-center px-4 py-8'>Sending magic link...</div>
          
        ) : (
          <form>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-2 border border-light-border dark:border-dark-border rounded-lg"
            />
            <button
              type="submit"
              onClick={() => {
                setLoading(true)
              }}
              className="w-full p-2 mt-2 bg-violet-500 text-white rounded-lg cursor-pointer"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
