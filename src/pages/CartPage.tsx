import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import {
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
  applyCoupon,
  removeCoupon,
} from "../features/cart/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, coupon, discount } = useSelector(
    (state: RootState) => state.cart
  );

  const [code, setCode] = useState("");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const tax = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;
  const total = Math.max(0, subtotal + shipping + tax - discount);

  if (items.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Cart</h1>
        <p className="mt-4 text-gray-600">Your cart is empty.</p>
        <button
          className="mt-4 bg-black text-white px-5 py-2 rounded-lg"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 flex gap-4 items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">₹{item.price}</p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  className="border px-3 py-1 rounded"
                  onClick={() => dispatch(decreaseQty(item.id))}
                >
                  -
                </button>
                <span className="font-bold">{item.quantity}</span>
                <button
                  className="border px-3 py-1 rounded"
                  onClick={() => dispatch(increaseQty(item.id))}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="text-red-600 font-semibold"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div className="mt-6 border rounded-xl p-4">
        <h2 className="font-bold mb-2">Apply Coupon</h2>

        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="SAVE10 or FLAT100"
            className="border rounded-lg px-4 py-2 flex-1"
          />
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => dispatch(applyCoupon(code))}
          >
            Apply
          </button>
          {coupon && (
            <button
              className="bg-gray-200 px-4 py-2 rounded-lg"
              onClick={() => dispatch(removeCoupon())}
            >
              Remove
            </button>
          )}
        </div>

        {coupon && (
          <p className="mt-2 text-green-700">
            Applied: <b>{coupon}</b> (Discount ₹{discount})
          </p>
        )}

        <p className="mt-2 text-gray-600 text-sm">
          Tips: SAVE10 = 10% off, FLAT100 = ₹100 off (subtotal ≥ ₹500)
        </p>
      </div>

      {/* Summary */}
      <div className="mt-6 border rounded-xl p-4">
        <h2 className="font-bold mb-3">Summary</h2>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹{shipping}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (5%)</span>
          <span>₹{tax}</span>
        </div>
        <div className="flex justify-between text-green-700">
          <span>Discount</span>
          <span>- ₹{discount}</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          className="mt-4 bg-black text-white px-5 py-3 rounded-lg w-full"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>

        <button
          className="mt-3 bg-red-600 text-white px-5 py-3 rounded-lg w-full"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}