import { BasicNode, PageNode, ImageNode } from '@/nodes'

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
  if (node.type === 'page') {
    return <PageNode node={node} index={index} isFocused={isFocused} />
  }
  if (node.type === 'image') {
    return <ImageNode node={node} index={index} isFocused={isFocused} />
  }
  return null
}
