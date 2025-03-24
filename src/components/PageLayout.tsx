import { ThemeToggle, Page, PagesListToggle } from '@/components'

export const PageLayout = () => {
  return (
    <main className="flex flex-col p-4 h-vh">
      <div className="flex justify-end items-center pb-4 gap-4">
        <PagesListToggle />
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-4 justify-start items-center">
        <Page />
      </div>
    </main>
  )
}
