import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type ProductVariant = {
  id: string;
  productId: string;
  weight: string;
  price: number;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  image?: string;
  category: string;
  isAvailable: boolean;
  variants?: ProductVariant[];
};

type ProductState = {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return (await response.json()) as Product[];
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
