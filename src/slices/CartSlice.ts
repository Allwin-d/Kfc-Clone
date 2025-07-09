// src/slices/CartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, CartItem } from "../Types";

// ✅ Initial state is now an array of CartItem (not Product)
const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      console.log(action.payload, "this is the action payload ");
      console.log(
        "🛒 Current cart state BEFORE:",
        JSON.parse(JSON.stringify(state))
      ); // clone to avoid Immer proxy issues
      console.log("📦 Adding product:", action.payload);
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
        console.log("🆕 Item added:", action.payload.name);
      }
      console.log("🆕 Item added:", action.payload.name);
      console.log(
        "🛒 Current cart state AFTER:",
        JSON.parse(JSON.stringify(state))
      );
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },

    // ✅ FIXED: Update quantity of specific item with proper validation
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;

      // ✅ Remove item if quantity is 0 or negative
      if (quantity <= 0) {
        return state.filter((item) => item.id !== id);
      }

      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },

    // ✅ Decrease quantity (remove if quantity becomes 0)
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          return state.filter((cartItem) => cartItem.id !== action.payload);
        }
      }
    },

    // ✅ Clear entire cart
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
