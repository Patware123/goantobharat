"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { store } from "@/store";
import { hydrate, loadFromStorage } from "@/store/cartSlice";

function CartHydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(hydrate(loadFromStorage()));
  }, []);

  // Persist cart to localStorage on every change
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const { items } = store.getState().cart;
      localStorage.setItem("cart", JSON.stringify(items));
    });
    return unsubscribe;
  }, []);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <CartHydrator>{children}</CartHydrator>
      </Provider>
    </SessionProvider>
  );
}
