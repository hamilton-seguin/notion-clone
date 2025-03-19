import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { NodeData } from '@/types'
import { useAppState } from '@/hooks'
import { supabase } from '@/supabaseClient'

export const PageNode = ({
  node,
  isFocused,
  index,
}: {
  node: NodeData
  isFocused: boolean
  index: number
}) => {
  const navigate = useNavigate()
  const [pageTile, setPageTitle] = useState('')

  const { removeNodeByIndex } = useAppState()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.key === 'Backspace') {
        removeNodeByIndex(index)
      }
      if (e.key === 'Enter') {
        navigate(`/${node.value}`)
      }
      if (isFocused) {
        window.addEventListener('keydown', handleKeyDown)
      } else {
        window.removeEventListener('keydown', handleKeyDown)
      }
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isFocused, index, node.value, removeNodeByIndex, navigate])

  useEffect(() => {
    const fetchPageTitle = async () => {
      const { data } = await supabase
        .from('pages')
        .select('title')
        .eq('slug', node.value)
        .single()
      setPageTitle(data?.title)
    }
    if (node.type === 'page' && node.value) {
      fetchPageTitle()
    }
  }, [node.type, node.value])

  const navigateToPage = () => {
    navigate(`/${node.value}`)
  }
  return (
    <div
      onClick={navigateToPage}
      className="cursor-pointer font-semibold w-full ml-4 p-1.5"
    >
      <span className="mr-2">{`📄 -`}</span>
      <span className="underline">{pageTile}</span>
    </div>
  )
}
