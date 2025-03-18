import { Route, Routes } from 'react-router'

import { PageLayout } from '@/components'

import { AppStateProvider } from '@/context/provider'
import { createPage } from '@/utils'
import { Auth } from '@/auth'

const initialState = createPage()

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <AppStateProvider initialState={initialState}>
            <PageLayout />
          </AppStateProvider>
        }
      />
      <Route
        path="/"
        element={
          <AppStateProvider initialState={initialState}>
            <PageLayout />
          </AppStateProvider>
        }
      />
    </Routes>
  )
}

export default App
