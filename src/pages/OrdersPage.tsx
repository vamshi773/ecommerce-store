import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.orders.orders);

  if (orders.length === 0) {
    return <div className="p-10 text-xl">No orders yet 📦</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">My Orders 📦</h1>

      <div className="space-y-6">
        {orders.map((o) => (
          <div key={o.orderId} className="border rounded-xl p-6 bg-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="font-bold">Order ID: {o.orderId}</div>
              <div className="text-gray-600">
                {new Date(o.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="mt-3 text-gray-700">
              Shipping to:{" "}
              <span className="font-semibold">
                {o.shipping.fullName}, {o.shipping.city} - {o.shipping.pincode}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {o.items.map((i) => (
                <div key={i.id} className="flex items-center gap-4 border rounded-lg p-3">
                  <img src={i.image} alt={i.title} className="h-12 w-12 object-cover rounded" />
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

            <div className="mt-4 text-lg font-bold">Total: ₹{o.total}</div>
            <div className="text-gray-600">Payment: {o.paymentMethod}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
