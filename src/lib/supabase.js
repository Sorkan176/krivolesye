import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase environment variables are not configured');
}

export const supabase = createClient(supabaseUrl, supabaseKey);


// console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
// console.log(
//   'KEY exists:',
//   Boolean(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY)
// );

// const { data } = supabase.storage
//   .from('goods')
//   .getPublicUrl('fish/main.jpg');
//
// console.log('URL fish', data.publicUrl);