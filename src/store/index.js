import { configureStore  } from "@reduxjs/toolkit";
import productsReduser from "../slices/productSlice";
import cartReduser,{ getTotals ,populateCart} from "../slices/cartSlice";
import { productApi } from "../slices/productApi";

export const store=configureStore({
    reducer:{
        products:productsReduser,
        cart:cartReduser,
        [productApi.reducerPath]:productApi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(productApi.middleware)
})

store.dispatch(productApi.endpoints.getAllProducts.initiate());
store.dispatch(populateCart());
store.dispatch(getTotals());