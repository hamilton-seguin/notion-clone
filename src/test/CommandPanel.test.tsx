import { render, screen, fireEvent } from '@testing-library/react'
import { expect, beforeEach } from 'vitest'

import { CommandPanel } from '@/components/CommandPanel'

import { SUPPORTED_NODE_TYPE } from '@/constants'
import * as hooks from '@/hooks' // to spy on useOverflowsScreenBottom

describe('CommandPanel', () => {
  const selectItemMock = vi.fn()

  beforeEach(() => {
    selectItemMock.mockClear()
    // Set default for useOverflowsScreenBottom to return no overflow.
    vi.spyOn(hooks, 'useOverflowsScreenBottom').mockReturnValue({
      overflows: false,
      ref: { current: null }
    })
  })

  it('renders header and list items', () => {
    render(<CommandPanel selectedItemIndex={-1} selectItem={selectItemMock} />)
    // Verify the header "Blocks" is rendered.
    expect(screen.getByText('Blocks')).toBeInTheDocument()
    // Verify each SUPPORTED_NODE_TYPE is rendered.
    SUPPORTED_NODE_TYPE.forEach((type) => {
      expect(screen.getByText(type.name)).toBeInTheDocument()
    })
  })

  it('applies correct class for the selected item', () => {
    // For example, set the second item (index 1) as selected.
    const selectedIndex = 1
    const { container } = render(
      <CommandPanel selectedItemIndex={selectedIndex} selectItem={selectItemMock} />
    )
    // Find all list items.
    const listItems = container.querySelectorAll('li')
    // The selected item should have a class indicating selection.
    expect(listItems[selectedIndex].className).toMatch(/bg-orange-300/)
  })

  it('calls selectItem callback when an item is clicked', () => {
    render(<CommandPanel selectedItemIndex={-1} selectItem={selectItemMock} />)
    // Click on the first item.
    const firstItem = screen.getByText(SUPPORTED_NODE_TYPE[0].name)
    fireEvent.click(firstItem)
    // Verify that selectItem is called with the correct value.
    expect(selectItemMock).toHaveBeenCalledWith(SUPPORTED_NODE_TYPE[0].value)
  })

  it('renders with "translate-y-full" class when overflows is false', () => {
    // The default in beforeEach returns overflows: false.
    const { container } = render(<CommandPanel selectedItemIndex={-1} selectItem={selectItemMock} />)
    const panelDiv = container.firstChild as HTMLElement
    expect(panelDiv.className).toMatch(/translate-y-full/)
  })

  it('renders with "-translate-y-16" class when overflows is true', () => {
    // Override the hook for this test to simulate overflow.
    vi.spyOn(hooks, 'useOverflowsScreenBottom').mockReturnValueOnce({
      overflows: true,
      ref: { current: null }
    })
    const { container } = render(<CommandPanel selectedItemIndex={-1} selectItem={selectItemMock} />)
    const panelDiv = container.firstChild as HTMLElement
    expect(panelDiv.className).toMatch(/-translate-y-16/)
  })
})