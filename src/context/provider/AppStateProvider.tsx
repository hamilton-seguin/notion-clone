import { ReactNode } from 'react'

import { Page } from '@/types'
import { usePageState } from '@/hooks'
import { AppStateContext } from '@/context'
import { withInitialState } from '@/state/withInitialState'

export const AppStateProviderComponent = ({
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

// Fix to HotReload issue: move withInitialState to after AppStateProviderComponent is defined
AppStateProviderComponent.displayName = 'AppStateProviderComponent'

const WrappedAppStateProvider = withInitialState<{
  children: React.ReactNode
}>(AppStateProviderComponent) as React.FC<{
  children: React.ReactNode
}>

WrappedAppStateProvider.displayName = 'AppStateProvider'

export const AppStateProvider = WrappedAppStateProvider
