import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { NodeTypeSwitcher } from '@/nodes'

import { NodeProps } from '@/types'

export const NodeContainer = ({
  node,
  index,
  updateFocusedIndex,
  isFocused,
}: NodeProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: node.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex relative w-full justify-center items-center"
      {...attributes}
    >
      <div
        className="p-1.5 cursor-grab focus:cursor-grabbing font-bold opacity-0 transition-opacity hover:opacity-100"
        {...listeners}
      >
        ⠿
      </div>
      <NodeTypeSwitcher
        node={node}
        index={index}
        updateFocusedIndex={updateFocusedIndex}
        isFocused={isFocused}
      />
    </div>
  )
}
