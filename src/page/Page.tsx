import { nanoid } from 'nanoid'

import { Cover, Spacer, Title } from '@/page'
import { NodeTypeSwitcher } from '@/nodes'

import { useFocusedNodeIndex, useAppState } from '@/hooks'

export const Page = () => {
  const { title, nodes, setTitle, addNode } = useAppState()
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes })

  return (
    <>
      <Cover />
      <div className="flex flex-col items-center justify-start w-full gap-1 pl-12">
        <Title title={title} changePageTitle={setTitle} addNode={addNode} />
        {nodes.map((node, index) => (
          <NodeTypeSwitcher
            key={node.id}
            node={node}
            updateFocusedIndex={setFocusedNodeIndex}
            isFocused={focusedNodeIndex === index}
            index={index}
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
