import { nanoid } from 'nanoid'
import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react'

import { useAppState } from '@/hooks'
import { NodeData } from '@/types'

export const BasicNode = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: {
  node: NodeData
  updateFocusedIndex(index: number): void
  isFocused: boolean
  index: number
}) => {
  const nodeRef = useRef<HTMLDivElement>(null)

  const { addNode, removeNodeByIndex, changeNodeValue } = useAppState()
  
  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus()
    } else {
      nodeRef.current?.blur()
    }
  }, [isFocused])

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value
    }
  }, [node])

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget
    changeNodeValue(index, textContent || '')
  }

  const handleClick = () => {
    updateFocusedIndex(index)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement
    if (e.key === 'Enter') {
      e.preventDefault()
      if (target.textContent?.[0] === '/') return
      addNode({ id: nanoid(), type: node.type, value: '' }, index + 1)
      updateFocusedIndex(index + 1)
    }
    if (e.key === 'Backspace') {
      if (target.textContent?.length === 0) {
        e.preventDefault()
        removeNodeByIndex(index)
        updateFocusedIndex(index - 1)
      } else if (window?.getSelection()?.anchorOffset === 0) {
        e.preventDefault()
        removeNodeByIndex(index)
        updateFocusedIndex(index)
      }
    }
  }

  return (
    <div
      ref={nodeRef}
      onInput={handleInput}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      contentEditable
      suppressContentEditableWarning
      className="w-full rounded p-1.5 pl-12 cursor-text"
    />
  )
}
