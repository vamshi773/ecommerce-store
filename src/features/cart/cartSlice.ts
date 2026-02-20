import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../utils/storage";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  coupon: string;
  discount: number; // discount amount in ₹
};

const initialState: CartState = loadState<CartState>("cart", {
  items: [],
  coupon: "",
  discount: 0,
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: { payload: Omit<CartItem, "quantity"> }
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },

    removeFromCart: (state, action: { payload: number }) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    increaseQty: (state, action: { payload: number }) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action: { payload: number }) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    clearCart: (state) => {
      state.items = [];
      state.coupon = "";
      state.discount = 0;
    },

    applyCoupon: (state, action: { payload: string }) => {
      const code = action.payload.trim().toUpperCase();
      const subtotal = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      let discount = 0;

      if (code === "SAVE10") {
        discount = Math.round(subtotal * 0.1);
      } else if (code === "FLAT100") {
        discount = subtotal >= 500 ? 100 : 0; // only if subtotal >= 500
      } else {
        discount = 0;
      }

      state.coupon = code;
      state.discount = discount;
    },

    removeCoupon: (state) => {
      state.coupon = "";
      state.discount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;