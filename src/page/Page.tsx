import { useState } from 'react'

import { NodeData } from '@/types'
import { useFocusedNodeIndex } from '@/hooks'
import { Cover, Spacer, Title, BasicNode } from '@/page'
import { nanoid } from 'nanoid'

export const Page = () => {
  const [nodes, setNodes] = useState<NodeData[]>([])
  const [title, setTitle] = useState('Title')
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes })

  const addNode = (node: NodeData, index: number) => {
    const newNodes = [...nodes]
    // insert new node at index
    newNodes.splice(index, 0, node)
    setNodes(newNodes)
  }

  const removeNodeByIndex = (index: number) => {
    const newNodes = [...nodes]
    // remove 1 node at index
    newNodes.splice(index, 1)
    setNodes(newNodes)
  }

  const changeNodeValue = (index: number, value: string) => {
    const newNodes = [...nodes]
    // update value of node at index
    newNodes[index].value = value
    setNodes(newNodes)
  }

  return (
    <>
      <Cover />
      <div className='flex flex-col items-center justify-start w-full'>
        <Title title={title} changePageTitle={setTitle} addNode={addNode} />
        {nodes.map((node, index) => (
          <BasicNode
            key={node.id}
            node={node}
            updateFocusedIndex={setFocusedNodeIndex}
            isFocused={focusedNodeIndex === index}
            index={index}
            addNode={addNode}
            removeNodeByIndex={removeNodeByIndex}
            changeNodeValue={changeNodeValue}
          />
        ))}
        <Spacer
          showHint={!nodes.length}
          handleClick={() => {
            addNode({ type: 'text', value: '', id: nanoid() }, nodes.length)
          }}
        />
      </div>
    </>
  )
}
