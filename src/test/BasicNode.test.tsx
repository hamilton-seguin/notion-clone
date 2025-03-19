import { render, fireEvent, waitFor } from '@testing-library/react'
import { expect } from 'vitest'

import { BasicNode } from '@/nodes'

import { NodeType } from '@/types'

// Dummy node to use for testing.
const dummyNode = {
  id: '1',
  type: 'text' as NodeType,
  value: 'Test node content'
}

// Create a mock for updateFocusedIndex so we can check when it’s called.
const updateFocusedIndexMock = vi.fn()

// We want to stub out useAppState and useCommandPanel while using the actual useNodeFocus.
// Here we use vi.mock to override only the parts we don't care about for this test.
vi.mock('@/hooks', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/hooks')>()
  return {
    ...actual,
    useAppState: () => ({
      addNode: vi.fn(),
      removeNodeByIndex: vi.fn(),
      changeNodeValue: vi.fn(),
      changeNodeType: vi.fn(),
    }),
    useCommandPanel: () => ({
      commandPanelIndex: 0,
      setCommandPanelIndex: vi.fn(),
    }),
    // Do not mock useNodeFocus so that its behavior is actually applied.
  }
})

describe('BasicNode (integration with useNodeFocus)', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the node with correct textContent when not focused', async () => {
    const { container } = render(
      <BasicNode
        node={dummyNode}
        isFocused={false}
        index={0}
        updateFocusedIndex={updateFocusedIndexMock}
      />
    )
    // Query the contentEditable element. (BasicNode renders a <div> with contentEditable)
    const contentEditable = container.querySelector('[contenteditable]')
    if (!contentEditable) throw new Error('Contenteditable element not found')
    // Wait for the hook’s useEffect to set the textContent.
    await waitFor(() => {
      expect(contentEditable.textContent).toBe(dummyNode.value)
    })
    // Also check that it isn’t focused.
    expect(document.activeElement).not.toBe(contentEditable)
  })

  it('focuses the node when isFocused is true', async () => {
    const { container } = render(
      <BasicNode
        node={dummyNode}
        isFocused={true}
        index={0}
        updateFocusedIndex={updateFocusedIndexMock}
      />
    )
    const contentEditable = container.querySelector('[contenteditable]')
    if (!contentEditable) throw new Error('Contenteditable element not found')
    // Wait until the node is focused by the hook.
    await waitFor(() => {
      expect(document.activeElement).toBe(contentEditable)
    })
    // And the textContent should remain equal to the node value.
    expect(contentEditable.textContent).toBe(dummyNode.value)
  })

  it('calls updateFocusedIndex when the node is clicked', () => {
    const { container } = render(
      <BasicNode
        node={dummyNode}
        isFocused={false}
        index={5}
        updateFocusedIndex={updateFocusedIndexMock}
      />
    )
    const contentEditable = container.querySelector('[contenteditable]')
    if (!contentEditable) throw new Error('Contenteditable element not found')
    // Simulate a click event on the contentEditable element.
    fireEvent.click(contentEditable)
    // The updateFocusedIndex callback should be called with the node’s index.
    expect(updateFocusedIndexMock).toHaveBeenCalledWith(5)
  })
})