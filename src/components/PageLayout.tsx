import { ThemeToggle, Page } from '@/components'

export const PageLayout = () => {
  return (
    <main className="flex flex-col p-4 h-vh">
      <ThemeToggle />
      <div className="flex flex-col gap-4 justify-start items-center">
        <Page />
      </div>
    </main>
  )
}
