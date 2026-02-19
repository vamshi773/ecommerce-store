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
  orderId: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
  shipping: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  paymentMethod: "COD";
};

type OrdersState = {
  orders: Order[];
};

const initialState: OrdersState = loadState<OrdersState>("orders", {
  orders: [],
});

function makeOrderId() {
  return "OD" + Math.floor(100000 + Math.random() * 900000).toString();
}

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action: { payload: Omit<Order, "orderId" | "createdAt"> }) => {
      const newOrder: Order = {
        orderId: makeOrderId(),
        createdAt: new Date().toISOString(),
        ...action.payload,
      };
      state.orders.unshift(newOrder);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { placeOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
