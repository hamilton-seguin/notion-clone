import { useNavigate } from 'react-router'

import { usePagesList } from '@/hooks'

export const PagesList = () => {
  const navigate = useNavigate()
  const { userPages, loading, error } = usePagesList()

  if (error) return <div>Error: {error}</div>

  return (
    <nav
      id="pages-list"
      popover=""
      className="opacity-0 open:opacity-100 transition-opacity duration-300 open:grid place-items-center w-auto min-w-fit self-center justify-self-center gap-4 open:bg-transparent dark:open:bg-transparent px-6 py-4"
    >
      {loading ? (
        <>Loading ...</>
      ) : (
        <div className="flex flex-col gap-2">
          <h1 className="mb-2">Your pages:</h1>
          {userPages.map((page) => (
            <div key={page.id}>
              <button
                className="w-full text-left cursor-pointer"
                onClick={() => navigate(`/${page.slug}`)}
              >
                <h3>
                  <span className="mr-2">{`📄 -`}</span>
                  <span className="underline">{page.title}</span>
                </h3>
              </button>
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}
