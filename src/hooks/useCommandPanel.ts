import { useEffect, useState } from 'react'
import { NodeType } from '@/types'
import { SUPPORTED_NODE_TYPE } from '@/constants'

export const useCommandPanel = (
  nodeValue: string,
  isCommandActive: boolean
) => {
  const [commandPanelIndex, setCommandPanelIndex] = useState(0)

  useEffect(() => {
    if (isCommandActive) {
      const normalizedValue = nodeValue.toLowerCase().replace('/', '')
      const abbreviationMap: { [key: string]: NodeType } = {
        h1: 'heading1',
        h2: 'heading2',
        h3: 'heading3',
        l: 'list',
        t: 'text',
      }
      const targetValue = abbreviationMap[normalizedValue] || normalizedValue
      const foundIndex = SUPPORTED_NODE_TYPE.findIndex((item) =>
        item.value.includes(targetValue)
      )
      setCommandPanelIndex(foundIndex >= 0 ? foundIndex : 0)
    }
  }, [nodeValue, isCommandActive])

  return {
    commandPanelIndex,
    setCommandPanelIndex,
  }
}
