import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import type { RootState } from "../store/store";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, title, price, image }: Product) {
  const dispatch = useDispatch();

  const isSaved = useSelector((state: RootState) =>
    state.wishlist.items.some((i) => i.id === id)
  );

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover rounded-lg"
        />
        <h2 className="mt-3 font-semibold line-clamp-2">{title}</h2>
      </Link>

      <p className="text-orange-500 font-bold mt-2">₹{price}</p>

      <button
        className="mt-3 w-full bg-black text-white py-2 rounded-lg"
        onClick={() => dispatch(addToCart({ id, title, price, image }))}
      >
        Add to Cart
      </button>

      <button
        className="mt-2 w-full border py-2 rounded-lg"
        onClick={() =>
          isSaved
            ? dispatch(removeFromWishlist(id))
            : dispatch(addToWishlist({ id, title, price, image }))
        }
      >
        {isSaved ? "Remove from Wishlist" : "❤️ Save to Wishlist"}
      </button>
    </div>
  );
}
