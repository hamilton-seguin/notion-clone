import { expect, beforeEach, afterEach } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemeToggle } from '@/components'

import { ThemeContext } from '@/context'

afterEach(() => {
  cleanup()
})

describe('ThemeToggle', () => {
  const setThemeMock = vi.fn()

  const renderWithTheme = (theme: 'light' | 'dark') => {
    return render(
      <ThemeContext.Provider value={{ theme, setTheme: setThemeMock }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    )
  }

  beforeEach(() => {
    setThemeMock.mockClear()
  })

  it('renders in light mode', () => {
    renderWithTheme('light')
    expect(screen.getByText(/light mode/i)).toBeInTheDocument()
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('renders in dark mode', () => {
    renderWithTheme('dark')
    expect(screen.getByText(/dark mode/i)).toBeInTheDocument()
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('toggles theme when checkbox is clicked', async () => {
    renderWithTheme('light')
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(setThemeMock).toHaveBeenCalledWith('dark')
  })
})
