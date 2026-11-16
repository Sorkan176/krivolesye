import { supabase } from '../lib/supabase.js';

export async function getGoods() {
  const { data, error } = await supabase
    .from('goods')
    .select(`
      id,
      title,
      price,
      created_at,
      categories (
        id,
        slug,
        name
      ),
      fandoms (
        id,
        slug,
        name
      ),
      good_images (
        id,
        storage_path,
        alt,
        position
      )
    `)
    .order('created_at', { ascending: false })
    .order('position', {
      referencedTable: 'good_images',
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}