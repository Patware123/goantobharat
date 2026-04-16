"use client";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { store, useAppSelector, useAppDispatch } from "@/store";
import { hydrate, loadFromStorage } from "@/store/cartSlice";
import { fetchProducts } from "@/store/productSlice";

function GlobalHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const productStatus = useAppSelector((state) => state.products.status);

  useEffect(() => {
    // Hydrate cart from localStorage
    dispatch(hydrate(loadFromStorage()));

    // Fetch products only once if they aren't already loading/succeeded
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, productStatus]);

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
        <GlobalHydrator>{children}</GlobalHydrator>
      </Provider>
    </SessionProvider>
  );
}

