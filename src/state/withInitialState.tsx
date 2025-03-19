import { useMatch } from 'react-router'
import { useState, useEffect, ComponentType } from 'react'

import startPageScaffold from '@/state/startPageScaffold.json'
import { Loader } from '@/components'

import { supabase } from '@/supabaseClient'
import { Page } from '@/types'

type InjectedProps = {
  initialState: Page
}

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>

export function withInitialState<TProps>(
  WrappedComponent: ComponentType<PropsWithoutInjected<TProps> & InjectedProps>
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const match = useMatch('/:slug')
    const pageSlug = match ? match.params.slug : 'start'

    const [initialState, setInitialState] = useState<Page | null>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | undefined>()

    useEffect(() => {
      setIsLoading(true)
      const fetchInitialState = async () => {
        try {
          const { data: userData } = await supabase.auth.getUser()
          const user = userData.user
          if (!user) {
            throw new Error('User is not logged in')
          }
          const { data } = await supabase
            .from('pages')
            .select('title, id, cover, nodes, slug')
            .match({ slug: pageSlug, created_by: user.id })
            .single()
          if (!data && pageSlug === 'start') {
            const result = await supabase
              .from('pages')
              .insert({
                ...startPageScaffold,
                slug: 'start',
                created_by: user.id,
              })
              .select()
              .single()
            console.log('result of insert: ', result)

            setInitialState(result?.data)
          } else {
            setInitialState(data)
          }
        } catch (e) {
          if (e instanceof Error) {
            setError(e)
          }
        }
        setIsLoading(false)
      }
      fetchInitialState()
    }, [pageSlug])

    if (isLoading) return <Loader />

    if (error) return <div>{error.message}</div>

    if (!initialState) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          Page not found
        </div>
      )
    }

    return <WrappedComponent {...props} initialState={initialState} />
  }
}
