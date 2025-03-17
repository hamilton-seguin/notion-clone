import { BasicNode } from '@/nodes'
import { NodeProps } from '@/types'
import { TEXT_NODE_TYPES } from '@/constants'


export const NodeTypeSwitcher = ({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodeProps) => {
  if (TEXT_NODE_TYPES.includes(node.type)) {
    return (
      <BasicNode
        node={node}
        updateFocusedIndex={updateFocusedIndex}
        isFocused={isFocused}
        index={index}
      />
    )
  }
  return null
}
