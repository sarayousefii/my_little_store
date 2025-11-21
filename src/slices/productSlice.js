import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: null,
};
const baseUrl= import.meta.env.MODE === "development" ? "http://localhost:10000/products" : "https://my-little-store-api.onrender.com/products";
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        try {
            const response = await axios.get( baseUrl);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers:builder=>{
        builder
            .addCase(fetchProducts.pending,(state,_)=>{
                state.status="pending";
            })
            .addCase(fetchProducts.fulfilled,(state,action)=>{
                state.items=action.payload;
                state.status="success";
            })
            .addCase(fetchProducts.rejected,(state,action)=>{
                state.status="rejected";
            })
    }
});

export default productsSlice.reducer;
