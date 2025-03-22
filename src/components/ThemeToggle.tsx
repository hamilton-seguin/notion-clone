import { ChangeEvent, useContext } from 'react'

import { ThemeContext } from '@/context'

export const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'dark' : 'light')
  }

  return (
    <label className="inline-flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        onChange={handleToggle}
        checked={isDark}
        className="sr-only peer"
      />
      <div className="w-14 h-8 rounded-full peer bg-light-border/70 hover:bg-light-border peer-hover:bg-light-border dark:bg-dark-border/80 hover:dark:bg-dark-border peer-hover:dark:bg-dark-border" />
      <div className="absolute top-1 left-1 h-6 w-6 rounded-full bg-light-bg dark:bg-light-border flex items-center justify-center transform transition-transform duration-300 peer-checked:translate-x-6 peer">
        {isDark ? (
          <img src="./moon.svg" alt="Dark mode" className="h-4.5 w-4.5" />
        ) : (
          <img src="./sun.svg" alt="Light mode" className="h-4.5 w-4.5" />
        )}
      </div>
      <span className="ml-3 text-sm font-medium">
        {isDark ? 'dark mode' : 'light mode'}
      </span>
    </label>
  )
}
