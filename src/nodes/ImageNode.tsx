import { useEffect, useRef } from 'react'

import { FileImage } from '@/components'

import { uploadImage } from '@/utils'
import { NodeData } from '@/types'
import { useAppState } from '@/hooks'

export const ImageNode = ({
  node,
  isFocused,
  index,
}: {
  node: NodeData
  isFocused: boolean
  index: number
}) => {
  const { removeNodeByIndex, changeNodeValue, changeNodeType } = useAppState()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.key === 'Backspace') {
        removeNodeByIndex(index)
      }
      if (e.key === 'Enter') {
        handleClick()
      }
    }
    if (isFocused) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isFocused, index, removeNodeByIndex])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    if (!target.files) {
      changeNodeType(index, 'text')
    }
    try {
      const result = await uploadImage(target.files?.[0])
      if (result?.filePath) {
        changeNodeValue(index, result.filePath)
      }
    } catch (e) {
      changeNodeType(index, 'text')
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
    onClick={handleClick}
      className={`cursor-pointer w-full ${isFocused ? 'opacity-80' : 'opacity-100 hover:opacity-80'}`}
    >
      <FileImage filePath={node.value} alt={node.value} />
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </div>
  )
}
