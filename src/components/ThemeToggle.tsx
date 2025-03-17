import { useState, useEffect, ChangeEvent } from 'react'

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mediaQuery.matches)
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark')
  }, [isDark])

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDark(e.target.checked)
  }

  return (
    <div className="flex justify-end items-center">
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
    </div>
  )
}
