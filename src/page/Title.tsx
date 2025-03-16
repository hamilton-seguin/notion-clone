import { useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'

import { NodeData } from '@/types'

export const Title = ({
  title,
  changePageTitle,
  addNode,
}: {
  title: string
  changePageTitle(title: string): void
  addNode(node: NodeData, index: number): void
}) => {
  const headerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const isFocused = document.activeElement === headerRef.current
    if (!isFocused && headerRef.current) {
      headerRef.current.textContent = title
    }
  }, [title])

  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addNode({ id: nanoid(), type: 'text', value: '' }, 0)
    }
  }

  return (
    <div className="px-10 max-w-4xl">
      <h1
        ref={headerRef}
        className="p-6 text-3xl focus:outline-none"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => changePageTitle(e.currentTarget.textContent || '')}
        onKeyDown={handleEnter}
      />
    </div>
  )
}
