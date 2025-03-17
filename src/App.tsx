import { Route, Routes } from 'react-router'

import { PageLayout } from '@/components'

import { AppStateProvider } from '@/context'
import { createPage } from '@/utils'

const initialState = createPage()

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<div>Auth</div>} />
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
