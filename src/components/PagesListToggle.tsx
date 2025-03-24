import { PagesList } from '@/components'

export const PagesListToggle = () => {
  return (
    <div className="relative">
      <button
        popoverTarget="pages-list"
        className="w-14 h-8 rounded-full bg-dark-bg hover:bg-dark-bg/80 dark:bg-light-bg  hover:dark:bg-light-bg/80 cursor-pointer"
      >
        📙
      </button>
      <PagesList />
    </div>
  )
}
