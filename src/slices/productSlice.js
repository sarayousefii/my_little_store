import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get({ baseUrl: import.meta.env.MODE === "development"
  ? "http://localhost:10000"
  : "https://my-little-store-api-1.onrender.com" });
      return response.data || [];
    } catch (err) {
      console.error("Failed to fetch products:", err);
      return []; 
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export default productsSlice.reducer;
