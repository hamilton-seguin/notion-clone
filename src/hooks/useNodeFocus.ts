import { useEffect, RefObject } from 'react'

export const useNodeFocus = (
  isFocused: boolean,
  nodeRef: RefObject<HTMLDivElement | null>,
  nodeValue: string
) => {
  useEffect(() => {
    if (nodeRef.current && document.activeElement !== nodeRef.current) {
      nodeRef.current.textContent = nodeValue
    }
    if (isFocused) {
      nodeRef.current?.focus()
    } else {
      nodeRef.current?.blur()
    }
  }, [isFocused, nodeRef, nodeValue])

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = nodeValue
    }
  }, [nodeValue, isFocused, nodeRef])
}
