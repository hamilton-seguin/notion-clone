import { arrayMove } from '@dnd-kit/sortable'
import { useImmer } from 'use-immer'

import { NodeData, NodeType, Page } from '@/types'

export const usePageState = (initialState: Page) => {
  const [page, setPage] = useImmer<Page>(initialState)

  const addNode = (node: NodeData, index: number) => {
    setPage((draft) => {
      draft.nodes.splice(index, 0, node)
    })
  }

  const removeNodeByIndex = (nodeIndex: number) => {
    setPage((draft) => {
      draft.nodes.splice(nodeIndex, 1)
    })
  }

  const changeNodeValue = (nodeIndex: number, value: string) => {
    setPage((draft) => {
      draft.nodes[nodeIndex].value = value
    })
  }

  const changeNodeType = (nodeIndex: number, type: NodeType) => {
    setPage((draft) => {
      draft.nodes[nodeIndex].type = type
      draft.nodes[nodeIndex].value = ''
    })
  }

  const setNodes = (nodes: NodeData[]) => {
    setPage((draft) => {
      draft.nodes = nodes
    })
  }

  const setTitle = (title: string) => {
    setPage((draft) => {
      draft.title = title
    })
  }

  const setCover = (cover: string) => {
    setPage((draft) => {
      draft.cover = cover
    })
  }

  const reorderNodes = (oldIndex: string, newIndex: string) => {
    setPage((draft) => {
      const index1 = draft.nodes.findIndex(node => node.id === oldIndex)
      const index2 = draft.nodes.findIndex(node => node.id === newIndex)
      draft.nodes = arrayMove(draft.nodes, index1, index2)
    })
  }

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    changeNodeValue,
    changeNodeType,
    addNode,
    removeNodeByIndex,
    setNodes,
    setTitle,
    setCover,
    reorderNodes,
  }
}
