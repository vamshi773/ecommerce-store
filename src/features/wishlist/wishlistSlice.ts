import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "../../utils/storage";

export type WishlistItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type WishlistState = {
  items: WishlistItem[];
};

const initialState: WishlistState = loadState<WishlistState>("wishlist", {
  items: [],
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.some((i) => i.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;

