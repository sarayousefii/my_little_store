import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Adapter برای مدیریت entities
const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState({
  cartTotalQty: 0,
  cartTotalAmount: 0,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // بارگذاری سبد خرید از localStorage
    populateCart(state) {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart && storedCart !== "undefined") {
        try {
          const parsedCart = JSON.parse(storedCart);
          cartAdapter.setAll(state, parsedCart);
        } catch (err) {
          console.error("Error parsing cartItems from localStorage:", err);
          cartAdapter.setAll(state, {}); // خالی کردن سبد در صورت خطا
        }
      } else {
        cartAdapter.setAll(state, {}); // اگر چیزی ذخیره نشده بود
      }
    },

    // اضافه کردن محصول به سبد
    addToCart(state, action) {
      const productExist = state.entities[action.payload.id];

      if (productExist) {
        state.entities[action.payload.id].cartQty += 1;
        toast.info("تعداد افزایش یافت", { position: "bottom-left" });
      } else {
        cartAdapter.addOne(state, { ...action.payload, cartQty: 1 });
        toast.success("محصول به سبد خرید اضافه شد", { position: "bottom-left" });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.entities));
    },

    // کاهش تعداد یا حذف محصول
    decreaseCart(state, action) {
      const product = state.entities[action.payload.id];

      if (!product) return; // اگر محصول موجود نبود

      if (product.cartQty > 1) {
        product.cartQty -= 1;
        toast.info("تعداد کاهش یافت", { position: "bottom-left" });
      } else {
        cartAdapter.removeOne(state, action.payload.id);
        toast.error("محصول از سبد خرید حذف شد", { position: "bottom-left" });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.entities));
    },

    // حذف کامل محصول
    removeFromCart(state, action) {
      cartAdapter.removeOne(state, action.payload.id);
      toast.error("محصول از سبد خرید حذف شد", { position: "bottom-left" });
      localStorage.setItem("cartItems", JSON.stringify(state.entities));
    },

    // محاسبه کل تعداد و قیمت سبد
    getTotals(state) {
      let { total, qty } = Object.values(state.entities).reduce(
        (cartTotal, cartItem) => {
          const { price, cartQty } = cartItem;
          const itemTotal = price * cartQty;

          cartTotal.total += itemTotal;
          cartTotal.qty += cartQty;

          return cartTotal;
        },
        { total: 0, qty: 0 }
      );
      state.cartTotalQty = qty;
      state.cartTotalAmount = total;
    },
  },
});

export const { selectAll } = cartAdapter.getSelectors((state) => state.cart);
export const { populateCart, addToCart, decreaseCart, removeFromCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;
