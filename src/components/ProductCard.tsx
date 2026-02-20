import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, title, price, image }: Product) {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={title}
          className="h-40 w-full object-cover rounded-lg"
        />
        <h2 className="mt-3 font-semibold">{title}</h2>
      </Link>

      <p className="text-orange-500 font-bold mt-1">₹{price}</p>

      <div className="flex gap-2 mt-3">
        <button
          className="w-full bg-black text-white py-2 rounded-lg"
          onClick={() => {
            dispatch(addToCart({ id, title, price, image }));
            toast.success("Added to cart ✅");
          }}
        >
          Add to Cart
        </button>

        <button
          className="bg-pink-600 text-white px-3 rounded-lg"
          onClick={() => {
            dispatch(addToWishlist({ id, title, price, image }));
            toast.success("Saved to wishlist ❤️");
          }}
        >
          ❤️
        </button>
      </div>
    </div>
  );
}