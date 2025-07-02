import { createContext, useContext, type ReactNode } from "react";
import type { Product } from "../Types";

type GlobalContextType = {
  cartItems: Product[];
  addToCart: (item: Product) => void;
};

type GlobalStateProps = {
  children: ReactNode;
};

const globalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: GlobalStateProps) => {
  const cartItems:Product[] = [];

  function addToCart(prod: Product) {
    if (cartItems.includes(prod)) {
      return cartItems;
    } else {
      cartItems.push(prod);
      console.log(cartItems);
    }
  }

  return (
    <globalContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </globalContext.Provider>
  );
};


export const useGlobalContext = () => {
  const context = useContext(globalContext);
  if (!context)
    throw new Error("useGlobalContext must be used inside GlobalProvider");
  return context;
};
