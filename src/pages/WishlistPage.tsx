import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  clearWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.wishlist.items);

  if (items.length === 0) {
    return <div className="p-10 text-xl">Wishlist is empty ❤️</div>;
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Wishlist ❤️</h1>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
          onClick={() => dispatch(clearWishlist())}
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border rounded-xl p-4 shadow">
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover rounded-lg"
            />
            <h2 className="mt-3 font-semibold line-clamp-2">{item.title}</h2>
            <p className="text-orange-500 font-bold mt-2">₹{item.price}</p>

            <button
              className="mt-3 w-full bg-black text-white py-2 rounded-lg"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                  })
                )
              }
            >
              Add to Cart
            </button>

            <button
              className="mt-2 w-full border py-2 rounded-lg"
              onClick={() => dispatch(removeFromWishlist(item.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

