import React, { createContext, useReducer, useContext, ReactNode, useState } from 'react';

// Types
export interface CartItem {
  id: string; // Changed to string to support composite IDs (e.g., "1-Small-Red")
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
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: State;
  addItem: (item: Omit<CartItem, 'quantity' | 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  successMessage: string | null;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer
const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems;
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) => 
          index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
      };
    }
    case 'UPDATE_QUANTITY': {
        const newItems = state.items.map(item => 
            item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ).filter(item => item.quantity > 0);
        return {
            ...state,
            items: newItems,
            itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
        };
    }
    case 'CLEAR_CART':
      return { items: [], itemCount: 0 };
    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const initialState: State = { items: [], itemCount: 0 };
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const addItem = (item: Omit<CartItem, 'quantity' | 'id'>) => {
    const compositeId = `${item.productId}-${item.size || ''}-${item.color || ''}`;
    dispatch({ type: 'ADD_ITEM', payload: { ...item, id: compositeId, quantity: 1 } });
    setSuccessMessage(`Added "${item.name}" to cart!`);
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity }});
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, successMessage, setSuccessMessage }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
