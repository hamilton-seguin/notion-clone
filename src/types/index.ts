import { usePageState } from "@/hooks"

export type NodeType =
  | 'text'
  | 'image'
  | 'list'
  | 'page'
  | 'heading1'
  | 'heading2'
  | 'heading3'

export type NodeData = {
  id: string
  type: NodeType
  value: string
}

export type NodeProps = {
  node: NodeData
  updateFocusedIndex(index: number): void
  isFocused: boolean
  index: number
}

export type Page = {
  id: string
  slug: string
  title: string
  nodes: NodeData[]
  cover: string
}

export type AppStateContextT = ReturnType<typeof usePageState>

export type SupportedNodeType = {
  value: NodeType
  name: string
}