import { Page } from '@/page'
import { ThemeToggle } from '@/components'

import { AppStateProvider } from '@/context'
import { createPage } from '@/utils'

const initialState = createPage()

function App() {
  return (
    <AppStateProvider initialState={initialState}>
      <main className="flex flex-col p-4 h-vh">
        <ThemeToggle />
        <div className="flex flex-col gap-4 justify-start items-center">
          <Page />
        </div>
      </main>
    </AppStateProvider>
  )
}

export default App
