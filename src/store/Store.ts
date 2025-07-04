// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/CartSlice"; // ✅ Import your cart reducer

const Store = configureStore({
  reducer: {
    cart: cartReducer, 
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
