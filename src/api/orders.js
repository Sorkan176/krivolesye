import { supabase } from '../lib/supabase';

export async function createOrder(cart) {
  const items = cart.map((item) => ({
    good_id: item.id,
    quantity: item.quantity,
  }));

  const { data, error } = await supabase.rpc('create_order', {
    p_items: items,
  });

  if (error) throw error;

  return data;
}


export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      status,
      total,
      created_at,
      order_items (
        id,
        good_id,
        title,
        price,
        quantity
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data;
}