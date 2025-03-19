import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { NodeContainer } from '@/nodes'
import { NodeType } from '@/types'

// Mock the dnd-kit sortable hook.
vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: { 'data-testid': 'sortable-attributes' },
    listeners: { onMouseDown: vi.fn() },
    setNodeRef: vi.fn(),
    transform: { x: 10, y: 20 },
    transition: 'transform 0.2s ease',
  }),
}))

// Mock NodeTypeSwitcher so we can check that it renders.
vi.mock('@/nodes/NodeTypeSwitcher', async () => {
  const actual = await vi.importActual('@/nodes/NodeTypeSwitcher')
  return {
    ...actual,
    NodeTypeSwitcher: () => <div data-testid="node-type-switcher">NodeTypeSwitcher</div>,
  }
})

describe('NodeContainer', () => {
  const dummyNode = { id: 'node-1', type: 'text' as NodeType, value: 'Hello' }
  const updateFocusedIndexMock = vi.fn()

  it('renders the draggable handle and NodeTypeSwitcher', () => {
    const { container } = render(
      <NodeContainer
        node={dummyNode}
        index={0}
        updateFocusedIndex={updateFocusedIndexMock}
        isFocused={false}
      />
    )
    // Check that the draggable handle is rendered (contains "⠿")
    expect(container.textContent).toContain('⠿')
    // Check that NodeTypeSwitcher is rendered.
    expect(screen.getByTestId('node-type-switcher')).toBeInTheDocument()
  })

  it('applies the correct transform and transition style', () => {
    const { container } = render(
      <NodeContainer
        node={dummyNode}
        index={0}
        updateFocusedIndex={updateFocusedIndexMock}
        isFocused={false}
      />
    )
    const outerDiv = container.firstChild as HTMLElement
    // dnd-kit's CSS.Transform.toString will compute a transform string from the transform object.
    // For our test, we assume it converts { x: 10, y: 20 } into a string that contains "10px" and "20px".
    expect(outerDiv.style.transform).toContain('10px')
    expect(outerDiv.style.transform).toContain('20px')
    expect(outerDiv.style.transition).toBe('transform 0.2s ease')
  })

  it('spreads attributes from useSortable onto the container', () => {
    const { container } = render(
      <NodeContainer
        node={dummyNode}
        index={0}
        updateFocusedIndex={updateFocusedIndexMock}
        isFocused={false}
      />
    )
    const outerDiv = container.firstChild as HTMLElement
    // Verify that the attribute from the mocked useSortable hook is present.
    expect(outerDiv.getAttribute('data-testid')).toBe('sortable-attributes')
  })
})