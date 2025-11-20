import { createBrowserClient as server } from '@supabase/ssr'
import { createClient as client } from '@supabase/supabase-js'
import { siteConfig } from '@/constants/siteConfig'

const { supabase } = siteConfig

export const createClient = () => client(supabase.serverUrl, supabase.anonKey)

export const createServerClient = () =>
  server(supabase.serverUrl, supabase.anonKey)
