// src/slices/CartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, CartItem } from "../Types";

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        // ✅ If item exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // ✅ If item doesn't exist, add with quantity 1
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        return state.filter((item) => item.id !== id);
      }

      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          return state.filter((cartItem) => cartItem.id !== action.payload);
        }
      }
    },

    clearCart: (state) => {
      console.log(state);
      return [];
    },
  },
});

// Export actions
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
