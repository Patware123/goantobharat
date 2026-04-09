import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

export type CartItem = {
  id: string;         // variant id
  productId?: string; // product id
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const loadFromStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      const qtyToAdd = action.payload.quantity || 1;
      if (existing) {
        existing.quantity += qtyToAdd;
      } else {
        state.items.push({ ...action.payload, quantity: qtyToAdd });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },


    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { hydrate, addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

// Memoized selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => sum + i.quantity, 0)
);
export const selectCartTotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0)
);

export { loadFromStorage };
export default cartSlice.reducer;
