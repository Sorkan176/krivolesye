import {useEffect, useState} from 'react';
import ShopContext from "./ShopContext.js";
import {getGoods} from "../api/goods.js";
import {adaptGoods} from "../api/goodsAdapter.js";
import useAuth from "./useAuth.js";
import {addFavorite, getFavorites, removeFavorite, syncFavorites} from "../api/favorites.js";
import {addCartItem, clearCartItems, getCart, removeCartItem, syncCart, updateCartQuantity} from "../api/cart.js";

function mergeCarts(userCart, guestCart) {
  const merged = new Map();

  [...userCart, ...guestCart].forEach(({ id, quantity }) => {
    merged.set(
      id,
      (merged.get(id) ?? 0) + quantity
    );
  });

  return Array.from(merged, ([id, quantity]) => ({
    id,
    quantity,
  }));
}

function mergeFavorites(userFavorites, guestFavorites) {
  return [...new Set([...userFavorites, ...guestFavorites])];
}

export function ShopProvider({ children }) {
  const { user, loadingAuth } = useAuth();

  const [goods, setGoods] = useState([]);
  const [loadingGoods, setLoadingGoods] = useState(true);
  const [goodsError, setGoodsError] = useState(null);

  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);

  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [favoritesError, setFavoritesError] = useState(null);

  const [theme, setTheme] = useState(() => {
    const currentTheme= localStorage.getItem("theme") ?? "light"
    document.documentElement.dataset.theme = currentTheme
    return currentTheme;
  });


  useEffect(() => {
    async function loadGoods() {
      try {
        setLoadingGoods(true);
        setGoodsError(null);

        const data = await getGoods();
        setGoods(adaptGoods(data));
      } catch (error) {
        console.error('Failed to load goods:', error);
        setGoodsError(error);
      } finally {
        setLoadingGoods(false);
      }
    }

    loadGoods();
  }, []);


  useEffect(() => {
    if (loadingAuth || user) return;

    localStorage.setItem('guest-cart', JSON.stringify(cart));
  }, [cart, user, loadingAuth]);


  useEffect(() => {
    if (loadingAuth || user) return;

    localStorage.setItem('guest-favorites', JSON.stringify(favorites));
  }, [favorites, user, loadingAuth]);


  useEffect(() => {
    if (loadingAuth) return;

    let cancelled = false;

    const syncData = async () => {
      setLoadingCart(true);
      setLoadingFavorites(true);

      try {
        const guestCart = JSON.parse(
          localStorage.getItem('guest-cart') || '[]'
        );

        const guestFavorites = JSON.parse(
          localStorage.getItem('guest-favorites') || '[]'
        );

        if (!user) {
          if (!cancelled) {
            setCart(guestCart);
            setFavorites(guestFavorites);
          }
          return;
        }

        const [userCart, userFavorites] = await Promise.all([
          getCart(),
          getFavorites(),
        ]);

        const normalizedUserCart = userCart.map((item) => ({
          id: item.good_id,
          quantity: item.quantity,
        }));

        const mergedCart = mergeCarts(
          normalizedUserCart,
          guestCart
        );

        const mergedFavorites = mergeFavorites(
          userFavorites,
          guestFavorites
        );

        await Promise.all([
          syncCart(mergedCart),
          syncFavorites(mergedFavorites),
        ]);

        if (!cancelled) {
          setCart(mergedCart);
          setFavorites(mergedFavorites);

          localStorage.removeItem('guest-cart');
          localStorage.removeItem('guest-favorites');
        }
      } catch (error) {
        console.error('Failed to synchronize shop data:', error);
      } finally {
        if (!cancelled) {
          setLoadingCart(false);
          setLoadingFavorites(false);
        }
      }
    };

    syncData();

    return () => {
      cancelled = true;
    };
  }, [user, loadingAuth]);

  useEffect(() => {
    if (loadingAuth) return;

    if (!user) {
      setCart([]);
      setFavorites([]);
      return;
    }
  }, [user, loadingAuth]);


  const addToCart = async (good) => {
    const id = good.id;

    if (user) {
      await addCartItem(id);
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);

      if (existing) {
        return prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { id, quantity: 1 }];
    });
  };

  const removeFromCart = async (id) => {
    if (user) {
      await removeCartItem(id);
    }

    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const changeQuantity = async (id, quantity) => {
    if (quantity < 1) {
      await removeFromCart(id);
      return;
    }

    if (user) {
      await updateCartQuantity(id, quantity);
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    if (cart.length === 0) return;

    if (user) {
      await clearCartItems();
    }

    setCart([]);
  };


  const toggleFavorite = async (goodId) => {
    if (loadingFavorites) return;

    setFavoritesError(null);
    const isFavorite = favorites.includes(goodId);

    if (!user) {
      setFavorites((prev) =>
        isFavorite
          ? prev.filter((id) => id !== goodId)
          : [...prev, goodId]
      );
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(goodId);
        setFavorites((prev) => prev.filter((id) => id !== goodId));
      } else {
        await addFavorite(goodId);
        setFavorites((prev) => [...prev, goodId]);
      }
    } catch (error) {
      console.error('Failed to update favorites:', error);
      throw error;
    }
  };

  const toggleTheme = ()=> {
    setTheme((current) => {
        current === "light" ? current = "dark" : current = "light";
        document.documentElement.dataset.theme = current;
        localStorage.setItem("theme", current);
        return current;
      }
    );
  }

  return (
    <ShopContext
      value={{
        goods,
        loadingGoods,
        goodsError,
        cart,
        loadingCart,
        addToCart,
        removeFromCart,
        changeQuantity,
        clearCart,
        favorites,
        toggleFavorite,
        loadingFavorites,
        favoritesError,
        theme,
        toggleTheme
      }}
    >
      {children}
    </ShopContext>
  );
}