import { Dispatch, useState, useEffect } from 'react'

import { NodeData } from '@/types'

export const useFocusedNodeIndex = ({
  nodes,
}: {
  nodes: NodeData[]
}): [number, Dispatch<React.SetStateAction<number>>] => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setFocusedNodeIndex(index => Math.max(index - 1, 0))
      }
      if (e.key === 'ArrowDown') {
        setFocusedNodeIndex(index => Math.min(index + 1, nodes.length - 1))
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [nodes])

  return [focusedNodeIndex, setFocusedNodeIndex]
}
