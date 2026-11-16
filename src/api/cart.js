import { supabase } from '../lib/supabase';

export async function getCart() {
  const { data, error } = await supabase
    .from('cart_items')
    .select('good_id, quantity');

  if (error) throw error;

  return data;
}

export async function addCartItem(goodId) {
  const { data: existingItem, error: selectError } = await supabase
    .from('cart_items')
    .select('quantity')
    .eq('good_id', goodId)
    .maybeSingle();

  if (selectError) throw selectError;

  const quantity = (existingItem?.quantity ?? 0) + 1;

  const { error } = await supabase
    .from('cart_items')
    .upsert(
      { good_id: goodId, quantity },
      { onConflict: 'user_id,good_id' }
    );

  if (error) throw error;
}

export async function updateCartQuantity(goodId, quantity) {
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('good_id', goodId);

  if (error) throw error;
}

export async function removeCartItem(goodId) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('good_id', goodId);

  if (error) throw error;
}

export async function clearCartItems() {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .neq('good_id', -1);

  if (error) throw error;
}

export async function syncCart(cart) {
  const { error: deleteError } = await supabase
    .from('cart_items')
    .delete()
    .neq('good_id', -1);

  if (deleteError) throw deleteError;

  if (cart.length === 0) return;

  const items = cart.map((item) => ({
    good_id: item.id,
    quantity: item.quantity,
  }));

  const { error } = await supabase
    .from('cart_items')
    .upsert(items, {
      onConflict: 'user_id,good_id',
    });

  if (error) throw error;
}