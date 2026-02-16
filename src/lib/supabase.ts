import { createClient } from '@supabase/supabase-js'

// قراءة المتغيرات من ملف الـ env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// إنشاء العميل
export const supabase = createClient(supabaseUrl, supabaseAnonKey)