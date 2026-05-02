// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// العميل المخصص للمتصفح والسيرفر (بدون صلاحيات أدمن)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// العميل المخصص لعمليات السيرفر فقط (بصلاحيات الأدمن لتجاوز RLS)
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }) 
  : null