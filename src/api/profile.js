import { supabase } from '../lib/supabase';

export async function updateProfileName({ userId, name }) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ name: name.trim() })
    .eq('id', userId)
    .select('id, name')
    .single();

  if (error) throw error;

  return data;
}