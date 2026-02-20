import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { clearOrders } from "../features/orders/ordersSlice";

export default function OrdersPage() {
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="mt-4 text-gray-600">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={() => dispatch(clearOrders())}
        >
          Clear Orders
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-xl p-4">
            <div className="flex justify-between flex-wrap gap-2">
              <p className="font-semibold">Order ID: {order.id}</p>
              <p className="text-gray-600">{order.createdAt}</p>
            </div>

            <p className="mt-2">
              <b>Total:</b> ₹{order.total}
            </p>

            <p className="text-gray-700 mt-1">
              <b>Payment:</b> {order.paymentMethod}
            </p>

            <div className="mt-3">
              <p className="font-semibold mb-2">Items:</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border rounded-lg p-2"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-600 text-sm">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-700">
              <p className="font-semibold">Shipping</p>
              <p>{order.shipping.name} — {order.shipping.phone}</p>
              <p>
                {order.shipping.address}, {order.shipping.city} -{" "}
                {order.shipping.pincode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}