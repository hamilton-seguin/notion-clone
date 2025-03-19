import { ImmerHook, useImmer } from 'use-immer'
import { useRef, useEffect } from 'react'

export const useSyncedState = <T>(
  initialState: T,
  syncCallback: (state: T) => void
): ImmerHook<T> => {
  const [state, setState] = useImmer<T>(initialState)
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) {
      syncCallback(state)
    }
    didMountRef.current = true
  }, [state, syncCallback])

  return [state, setState]
}
