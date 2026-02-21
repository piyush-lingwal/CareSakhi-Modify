import { createContext, useContext, useReducer, useEffect, ReactNode, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string; // composite: productId-size-color
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface State {
  items: CartItem[];
  itemCount: number;
}

type Action =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR' };

function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CART':
      return { items: action.payload, itemCount: action.payload.reduce((s, i) => s + i.quantity, 0) };
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      const items = existing
        ? state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + action.payload.quantity } : i)
        : [...state.items, action.payload];
      return { items, itemCount: items.reduce((s, i) => s + i.quantity, 0) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.id !== action.payload);
      return { items, itemCount: items.reduce((s, i) => s + i.quantity, 0) };
    }
    case 'UPDATE_QUANTITY': {
      const items = state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i);
      return { items, itemCount: items.reduce((s, i) => s + i.quantity, 0) };
    }
    case 'CLEAR':
      return { items: [], itemCount: 0 };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  successMessage: string | null;
  setSuccessMessage: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper: localStorage cart for guests
const LS_KEY = 'caresakhi-cart';
function getLocalCart(): CartItem[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}
function setLocalCart(items: CartItem[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, { items: [], itemCount: 0 });
  const [successMessage, setSuccessMessage] = useState<string | null>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [syncing, _setSyncing] = useState(false);

  // Fetch cart from DB when logged in, from localStorage when guest
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        const { data } = await supabase
          .from('cart_items')
          .select('*, products(name, price, image_url)')
          .eq('user_id', user.id);

        if (data) {
          const items: CartItem[] = data.map((ci: any) => ({
            id: `${ci.product_id}-${ci.size || ''}-${ci.color || ''}`,
            productId: ci.product_id,
            name: ci.products?.name || '',
            price: Number(ci.products?.price || 0),
            image: ci.products?.image_url || '',
            quantity: ci.quantity,
            size: ci.size || undefined,
            color: ci.color || undefined,
          }));
          dispatch({ type: 'SET_CART', payload: items });
        }

        // Merge guest cart into DB if any
        const guestCart = getLocalCart();
        if (guestCart.length > 0) {
          for (const item of guestCart) {
            await supabase.from('cart_items').upsert({
              user_id: user.id,
              product_id: item.productId,
              size: item.size || null,
              color: item.color || null,
              quantity: item.quantity,
            }, { onConflict: 'user_id,product_id,size,color' });
          }
          localStorage.removeItem(LS_KEY);
          // Refetch
          const { data: refreshed } = await supabase
            .from('cart_items')
            .select('*, products(name, price, image_url)')
            .eq('user_id', user.id);
          if (refreshed) {
            const items: CartItem[] = refreshed.map((ci: any) => ({
              id: `${ci.product_id}-${ci.size || ''}-${ci.color || ''}`,
              productId: ci.product_id,
              name: ci.products?.name || '',
              price: Number(ci.products?.price || 0),
              image: ci.products?.image_url || '',
              quantity: ci.quantity,
              size: ci.size || undefined,
              color: ci.color || undefined,
            }));
            dispatch({ type: 'SET_CART', payload: items });
          }
        }
      } else {
        dispatch({ type: 'SET_CART', payload: getLocalCart() });
      }
    };
    loadCart();
  }, [user]);

  // Persist guest cart
  useEffect(() => {
    if (!user && !syncing) {
      setLocalCart(state.items);
    }
  }, [state.items, user, syncing]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const addItem = async (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    showSuccess(`${item.name} added to cart!`);

    if (user) {
      await supabase.from('cart_items').upsert({
        user_id: user.id,
        product_id: item.productId,
        size: item.size || null,
        color: item.color || null,
        quantity: (state.items.find(i => i.id === item.id)?.quantity || 0) + item.quantity,
      }, { onConflict: 'user_id,product_id,size,color' });
    }
  };

  const removeItem = async (id: string) => {
    const item = state.items.find(i => i.id === id);
    dispatch({ type: 'REMOVE_ITEM', payload: id });

    if (user && item) {
      await supabase.from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', item.productId)
        .eq('size', item.size || '')
        .eq('color', item.color || '');
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) { removeItem(id); return; }
    const item = state.items.find(i => i.id === id);
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

    if (user && item) {
      await supabase.from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', item.productId)
        .eq('size', item.size || '')
        .eq('color', item.color || '');
    }
  };

  const clearCart = async () => {
    dispatch({ type: 'CLEAR' });
    if (user) {
      await supabase.from('cart_items').delete().eq('user_id', user.id);
    } else {
      localStorage.removeItem(LS_KEY);
    }
  };

  return (
    <CartContext.Provider value={{ items: state.items, itemCount: state.itemCount, addItem, removeItem, updateQuantity, clearCart, successMessage, setSuccessMessage }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error('useCart must be used within a CartProvider');
  return context;
}
