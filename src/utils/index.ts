import { nanoid } from 'nanoid'

import { NodeType, Page } from '@/types'

export const createPage = () => {
  const slug = nanoid()
  const id = nanoid()
  const page: Page = {
    id,
    slug,
    title: 'Untitled',
    nodes: [],
    cover: './notion-clone-cover.png',
  }
  return page
}

export const getNodeStyle = (
  type: Omit<NodeType, 'page' | 'image'>
): string => {
  switch (type) {
    case 'text':
      return ''
    case 'list':
      return 'list-item list-disc'
    case 'heading1':
      return 'text-4xl font-bold'
    case 'heading2':
      return 'text-3xl font-bold'
    case 'heading3':
      return 'text-2xl font-bold'
    default:
      return ''
  }
}
