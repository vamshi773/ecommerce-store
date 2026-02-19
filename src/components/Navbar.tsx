import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useState, useEffect } from "react";

export default function Navbar() {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!location.pathname.startsWith("/products")) {
      setSearch("");
    }
  }, [location.pathname]);

  const onSearch = (value: string) => {
    setSearch(value);
    navigate(`/products?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="bg-white shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <Link to="/" className="text-xl font-bold text-gray-800">
        ShopEasy
      </Link>

      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search products..."
        className="border rounded-lg px-4 py-2 w-full md:w-[400px]"
      />

      <div className="space-x-6">
        <Link className="text-gray-600 hover:text-black" to="/">
          Home
        </Link>
        <Link className="text-gray-600 hover:text-black" to="/products">
          Products
        </Link>

        <Link className="text-gray-600 hover:text-black" to="/wishlist">
          Wishlist ❤️{" "}
          <span className="ml-1 bg-black text-white px-2 py-0.5 rounded-full text-sm">
            {wishlistCount}
          </span>
        </Link>

        <Link className="text-gray-600 hover:text-black" to="/cart">
          Cart 🛒{" "}
          <span className="ml-1 bg-black text-white px-2 py-0.5 rounded-full text-sm">
            {cartCount}
          </span>
        </Link>
      </div>
    </div>
  );
}

