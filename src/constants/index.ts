import { SupportedNodeType, NodeType } from '@/types'

export const SUPPORTED_NODE_TYPE: SupportedNodeType[] = [
  { value: 'text', name: 'Text' },
  { value: 'list', name: 'List' },
  { value: 'page', name: 'Page' },
  { value: 'image', name: 'Image' },
  { value: 'heading1', name: 'Heading 1' },
  { value: 'heading2', name: 'Heading 2' },
  { value: 'heading3', name: 'Heading 3' },
]

export const TEXT_NODE_TYPES: NodeType[] = [
  'text',
  'list',
  'heading1',
  'heading2',
  'heading3',
]
