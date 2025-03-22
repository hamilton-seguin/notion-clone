import { useEffect, useState } from 'react'
import { Page } from '@/types'
import { supabase } from '@/supabaseClient'

/**
 * Hook to fetch pages from Supabase
 */
export const usePagesList = () => {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          .order('inserted_at', { ascending: false })

        if (error) {
          throw error
        }

        setPages(data || [])
      } catch (err) {
        console.error('Error fetching pages:', err)
        setError('Failed to load pages')
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [])

  return { userPages: pages, loading, error }
}
