import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { clearCart } from "../features/cart/cartSlice";
import { placeOrder } from "../features/orders/ordersSlice";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state: RootState) => state.cart.items);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  if (items.length === 0) {
    return (
      <div className="p-10">
        <div className="text-xl mb-4">Your cart is empty 🛒</div>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/products")}
        >
          Go to Products
        </button>
      </div>
    );
  }

  const onPlaceOrder = () => {
    if (!fullName || !phone || !address || !city || !pincode) {
      alert("Please fill all shipping details.");
      return;
    }

    dispatch(
      placeOrder({
        items: items.map((i) => ({
          id: i.id,
          title: i.title,
          price: i.price,
          image: i.image,
          quantity: i.quantity,
        })),
        total,
        shipping: { fullName, phone, address, city, pincode },
        paymentMethod: "COD",
      })
    );

    dispatch(clearCart());
    navigate("/orders");
  };

  return (
    <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Shipping Form */}
      <div>
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <h2 className="text-lg font-semibold mb-3">Shipping Details</h2>

        <div className="space-y-3">
          <input
            className="border rounded-lg px-4 py-2 w-full"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className="border rounded-lg px-4 py-2 w-full"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="border rounded-lg px-4 py-2 w-full"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="border rounded-lg px-4 py-2 w-full"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className="border rounded-lg px-4 py-2 w-full"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div className="font-semibold mb-2">Payment Method</div>
            <div className="border rounded-lg p-3 bg-white">
              Cash on Delivery (COD) ✅
            </div>
          </div>

          <button
            className="mt-6 bg-black text-white px-5 py-3 rounded-lg w-full"
            onClick={onPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
        <div className="space-y-4">
          {items.map((i) => (
            <div
              key={i.id}
              className="flex items-center gap-4 border rounded-lg p-4 bg-white"
            >
              <img
                src={i.image}
                alt={i.title}
                className="h-16 w-16 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-semibold line-clamp-1">{i.title}</div>
                <div className="text-gray-600">
                  ₹{i.price} × {i.quantity}
                </div>
              </div>
              <div className="font-bold">₹{i.price * i.quantity}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-xl font-bold">Total: ₹{total}</div>
      </div>
    </div>
  );
}
