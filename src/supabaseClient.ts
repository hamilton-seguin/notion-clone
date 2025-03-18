import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAPIKey = import.meta.env.VITE_SUPABASE_API_KEY

if (!supabaseUrl || !supabaseAPIKey) {
  throw new Error('Missing supabase url or key')
}

export const supabase = createClient(supabaseUrl, supabaseAPIKey)
