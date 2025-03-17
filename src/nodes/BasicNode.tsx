import { nanoid } from 'nanoid'
import { FormEventHandler, KeyboardEventHandler, useRef } from 'react'

import { CommandPanel } from '@/components'

import { SUPPORTED_NODE_TYPE } from '@/constants'
import { useAppState, useNodeFocus, useCommandPanel } from '@/hooks'
import { NodeProps, NodeType } from '@/types'
import { getNodeStyle } from '@/utils'

export const BasicNode = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const showCommandPanel = isFocused && node?.value.startsWith('/')

  useNodeFocus(isFocused, nodeRef, node.value)

  const { addNode, removeNodeByIndex, changeNodeValue, changeNodeType } =
    useAppState()
  const { commandPanelIndex, setCommandPanelIndex } = useCommandPanel(
    node.value,
    showCommandPanel
  )

  const parseCommand = (nodeType: NodeType) => {
    changeNodeType(index, nodeType)
    changeNodeValue(index, '')
    addNode({ id: nanoid(), type: node.type, value: '' }, index + 1)
    updateFocusedIndex(index + 1)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement
    if (showCommandPanel && e.key === 'Escape') {
      e.preventDefault()
      changeNodeValue(index, '')
      if (nodeRef.current) nodeRef.current.textContent = ''
      return
    }

    if (
      showCommandPanel &&
      (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter')
    ) {
      e.preventDefault()
      if (e.key === 'ArrowUp') {
        setCommandPanelIndex((prev) =>
          prev === 0 ? SUPPORTED_NODE_TYPE.length - 1 : prev - 1
        )
      } else if (e.key === 'ArrowDown') {
        setCommandPanelIndex((prev) =>
          prev === SUPPORTED_NODE_TYPE.length - 1 ? 0 : prev + 1
        )
      } else if (e.key === 'Enter') {
        const selectedCommand = SUPPORTED_NODE_TYPE[commandPanelIndex].value
        changeNodeType(index, selectedCommand)
        changeNodeValue(index, '')
        if (nodeRef.current) {
          nodeRef.current.textContent = ''
        }
      }
      return
    }

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
    if (e.key === 'Delete') {
      if (target.textContent?.length === 0) {
        e.preventDefault()
        removeNodeByIndex(index)
        updateFocusedIndex(index - 1)
      }
    }
  }

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    changeNodeValue(index, currentTarget.textContent || '')
  }

  return (
    <div className='relative w-full'>
      {showCommandPanel && (
        <CommandPanel
          selectedItemIndex={commandPanelIndex}
          selectItem={(nodeType) => {
            parseCommand(nodeType)
          }}
        />
      )}
      <div
        ref={nodeRef}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onClick={() => updateFocusedIndex(index)}
        contentEditable
        suppressContentEditableWarning
        className={`w-full rounded p-1.5 cursor-text ${getNodeStyle(
          node.type
        )}`}
      />
    </div>
  )
}
