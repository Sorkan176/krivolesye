import { supabase } from '../lib/supabase';


export async function getFavorites() {
  const { data, error } = await supabase
    .from('favorites')
    .select('good_id');

  if (error) throw error;

  return data.map((item) => item.good_id);
}


export async function addFavorite(goodId) {
  const { error } = await supabase
    .from('favorites')
    .insert({ good_id: goodId });

  if (error) throw error;
}

export async function removeFavorite(goodId) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('good_id', goodId);

  if (error) throw error;
}

export async function syncFavorites(favorites) {
  if (favorites.length === 0) return;

  const items = favorites.map((goodId) => ({
    good_id: goodId,
  }));

  const { error } = await supabase
    .from('favorites')
    .upsert(items, {
      onConflict: 'user_id,good_id',
      ignoreDuplicates: true,
    });

  if (error) throw error;
}