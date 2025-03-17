import { Page } from '@/page'
import ThemeToggle from '@/components/ThemeToggle'

import { AppStateProvider } from '@/context'
import { createPage } from '@/utils'

const initialState = createPage()

function App() {
  return (
    <AppStateProvider initialState={initialState}>
      <main className="flex flex-col p-4 h-dvh bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
        <ThemeToggle />
        <div className="flex flex-col gap-4 justify-start items-center">
          <Page />
        </div>
      </main>
    </AppStateProvider>
  )
}

export default App
