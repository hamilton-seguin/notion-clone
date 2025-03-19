import { nanoid } from 'nanoid'

import { supabase } from '@/supabaseClient'
import { NodeType, Page, ArgumentTypes } from '@/types'

export const createPage = async () => {
  const { data: userData } = await supabase.auth.getUser()
  const user = userData.user
  if (!user) {
    throw new Error('You must be logged in to create a page.')
  }
  const slug = nanoid()
  const page = {
    id: undefined,
    title: 'Untitled',
    slug,
    nodes: [],
    created_by: user.id,
  }
  await supabase.from('pages').insert(page)
  const { data: pageData } = await supabase
    .from('pages')
    .select('id')
    .match({ slug, created_by: user.id })
    .single()
  page.id = pageData?.id
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

// eslint-disable-next-line
export function debounce<TCallback extends Function>(
  callback: TCallback,
  delay = 300
) {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (...args: ArgumentTypes<TCallback>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback(...args), delay)
  }
}

export const updatePage = debounce(
  async (page: Partial<Page> & Pick<Page, 'id'>) => {
    await supabase.from('pages').update(page).eq('id', page.id)
  },
  500
)

export const uploadImage = async (file: File | undefined) => {
  try {
    if (!file) {
      throw new Error('No file provided')
    }
    const fileExt = file.name.split('.').pop()
    const fileName = `${nanoid()}.${fileExt}`
    const filePath = fileName
    await supabase.storage.from('images').upload(filePath, file)
    return { filePath, fileName }
  } catch (error) {
    console.error('Error uploading image', error)
  }
}
