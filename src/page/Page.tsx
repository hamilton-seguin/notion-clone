import { nanoid } from 'nanoid'
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Cover, Spacer, Title } from '@/page'
import { NodeContainer } from '@/nodes'

import { useFocusedNodeIndex, useAppState } from '@/hooks'

export const Page = () => {
  const { title, nodes, setTitle, addNode, reorderNodes } = useAppState()
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusedNodeIndex({ nodes })

  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event
    if (over?.id && active.id !== over.id) {
      reorderNodes(active.id as string, over.id as string)
    }
  }
  return (
    <>
      <Cover />
      <div className="flex flex-col items-center justify-start w-full gap-1 pl-12">
        <Title title={title} changePageTitle={setTitle} addNode={addNode} />
        <DndContext onDragEnd={handleDragEvent}>
          <SortableContext items={nodes} strategy={verticalListSortingStrategy}>
            {nodes.map((node, index) => (
              <NodeContainer
                key={node.id}
                node={node}
                updateFocusedIndex={setFocusedNodeIndex}
                isFocused={focusedNodeIndex === index}
                index={index}
              />
            ))}
          </SortableContext>
          <DragOverlay />
        </DndContext>
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
