import { ReactNode } from 'react'

import { Page } from '@/types'
import { usePageState } from '@/hooks'
import { AppStateContext } from '@/context'
import { withInitialState } from '@/state/withInitialState'

export const AppStateProvider = withInitialState<{
  children: ReactNode
  initialState: Page
}>(
  ({ children, initialState }: { children: ReactNode; initialState: Page }) => {
    const pageStateHandlers = usePageState(initialState)

    return (
      <AppStateContext.Provider value={pageStateHandlers}>
        {children}
      </AppStateContext.Provider>
    )
  }
)
