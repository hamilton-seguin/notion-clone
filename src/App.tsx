import { Route, Routes } from 'react-router'

import { PageLayout } from '@/components'

import { AppStateProvider } from '@/context/provider'
import { Auth, Private } from '@/auth'

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <Private
            component={
              <AppStateProvider>
                <PageLayout />
              </AppStateProvider>
            }
          />
        }
      />
      <Route
        path="/"
        element={
          <Private
            component={
              <AppStateProvider>
                <PageLayout />
              </AppStateProvider>
            }
          />
        }
      />
    </Routes>
  )
}

export default App
