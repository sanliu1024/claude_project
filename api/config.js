// Supabase 配置
// 在 Supabase 控制台获取这些值
export const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
export const supabaseKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(supabaseUrl, supabaseKey);
