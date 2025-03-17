import { ReactNode } from 'react'

import { usePageState, AppStateContext } from '@/hooks'
import { Page } from '@/types'

export const AppStateProvider = ({
  children,
  initialState,
}: {
  children: ReactNode
  initialState: Page
}) => {
  const pageStateHandlers = usePageState(initialState)

  return (
    <AppStateContext.Provider value={pageStateHandlers}>
      {children}
    </AppStateContext.Provider>
  )
}
