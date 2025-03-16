import Title from '@/page/Title'
import Cover from '@/page/Cover'
import ThemeToggle from '@/components/ThemeToggle'

function App() {
  return (
    <main className="flex flex-col p-4 h-dvh  bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      <ThemeToggle />
      <div className="flex flex-col gap-4 justify-start items-center">
        <Cover />
        <Title />
      </div>
    </main>
  )
}

export default App
