import { supabase } from '../lib/supabase';

export function adaptGoods(goods) {
  return goods.map((good) => ({
    id: good.id,
    title: good.title,
    fandom: good.fandoms.slug,
    price: Number(good.price),
    category: good.categories.slug,

    images: [...good.good_images]
      .sort((a, b) => a.position - b.position)
      .map((image) => {
        const { data } = supabase.storage
          .from('goods')
          .getPublicUrl(image.storage_path);

        return {
          imageId: image.id,
          src: data.publicUrl,
          alt: image.alt,
        };
      }),

  }));
}