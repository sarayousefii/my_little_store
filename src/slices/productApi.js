import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.MODE === "development" ? "http://localhost:10000" : "https://my-little-store-api.onrender.com"}),
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => `/products`,
        }),
        getProduct:builder.query({
            query:(id)=>`/products/${id}`
        })
    }),
});

export const { useGetAllProductsQuery,useGetProductQuery } = productApi;
