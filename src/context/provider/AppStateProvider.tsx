import { ReactNode } from 'react'

import { usePageState } from '@/hooks'
import { AppStateContext } from '@/context'
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
