import { createSlice } from "@reduxjs/toolkit";
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
    addToWishlist: (state, action: { payload: WishlistItem }) => {
      const exists = state.items.find((p) => p.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },
    removeFromWishlist: (state, action: { payload: number }) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;