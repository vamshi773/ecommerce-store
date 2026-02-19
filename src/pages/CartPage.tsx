import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return <div className="p-10 text-xl">Your cart is empty 🛒</div>;
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-16 w-16 object-cover rounded"
            />

            <div className="flex-1">
              <div className="font-semibold">{item.title}</div>
              <div className="text-orange-500 font-bold">₹{item.price}</div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => dispatch(decreaseQty(item.id))}
                >
                  -
                </button>

                <span className="font-bold">{item.quantity}</span>

                <button
                  className="px-3 py-1 border rounded"
                  onClick={() => dispatch(increaseQty(item.id))}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="bg-black text-white px-3 py-2 rounded-lg"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-xl font-bold">Total: ₹{total}</div>

      {/* ✅ Checkout Button */}
      <button
        className="mt-4 bg-black text-white px-5 py-3 rounded-lg"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}



