import ordersReducer from "../features/orders/ordersSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/productsSlice";
import authReducer from "../features/auth/authSlice";
import { saveState } from "../utils/storage";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
    auth: authReducer,
  },
});

store.subscribe(() => {
  saveState("cart", store.getState().cart);
  saveState("orders", store.getState().orders);
  saveState("auth", store.getState().auth);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
