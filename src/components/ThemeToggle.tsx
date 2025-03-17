import { useState, useEffect, ChangeEvent } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDark(e.target.checked)
    document.body.classList.toggle('dark')
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
        <div className="w-14 h-8 bg-gray-200 rounded-full peer dark:bg-zinc-600 hover:bg-gray-200/80 hover:dark:bg-zinc-600/80 peer-hover:dark:bg-zinc-600/80 peer-hover:bg-gray-200/80"></div>
        <div className="absolute top-1 left-1 h-6 w-6 rounded-full bg-white flex items-center justify-center transform transition-transform duration-300 peer-checked:translate-x-6 peer">
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
