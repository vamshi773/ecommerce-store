import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/products/productsSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import ordersReducer from "../features/orders/ordersSlice";
import { saveState } from "../utils/storage";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
  },
});

store.subscribe(() => {
  saveState("cart", store.getState().cart);
  saveState("wishlist", store.getState().wishlist);
  saveState("orders", store.getState().orders);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
