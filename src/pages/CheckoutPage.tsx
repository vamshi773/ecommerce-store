import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import type { RootState } from "../store/store";
import { addOrder } from "../features/orders/ordersSlice";
import { clearCart } from "../features/cart/cartSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart?.items ?? []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const placeOrderNow = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty ❌");
      return;
    }

    if (!name || !phone || !address || !city || !pincode) {
      toast.error("Please fill all shipping details ❌");
      return;
    }

    const newOrder = {
      id: String(Date.now()),
      createdAt: new Date().toLocaleString(),
      items: cartItems,
      total: subtotal,
      shipping: { name, phone, address, city, pincode },
      paymentMethod,
    };

    dispatch(addOrder(newOrder));
    dispatch(clearCart());

    toast.success("Order placed ✅");
    navigate("/orders");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Shipping Form */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold text-lg mb-3">Shipping Details</h2>

          <div className="space-y-3">
            <input
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            <select
              className="border rounded-lg px-3 py-2 w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
            </select>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-xl p-4">
          <h2 className="font-semibold text-lg mb-3">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button
            className="mt-4 bg-black text-white px-5 py-3 rounded-lg w-full"
            onClick={placeOrderNow}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}