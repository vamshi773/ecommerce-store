import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../utils/storage";

export type OrderItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  shipping: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  paymentMethod: string;
};

type OrdersState = {
  orders: Order[];
};

const initialState: OrdersState = loadState<OrdersState>("orders", {
  orders: [],
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: { payload: Order }) => {
      state.orders.unshift(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
