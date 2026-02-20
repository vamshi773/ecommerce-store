import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { useState, useEffect } from "react";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = useSelector((state: RootState) =>
    (state.cart?.items ?? []).reduce((sum, i) => sum + i.quantity, 0)
  );

  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist?.items?.length ?? 0
  );

  const auth = useSelector((state: RootState) => state.auth);
  const username = auth?.user?.username ?? "";
  const isAuthenticated = auth?.isAuthenticated ?? false;

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!location.pathname.startsWith("/products")) setSearch("");
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

      <div className="flex items-center flex-wrap gap-4">
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

        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-700">
              Hi, <b>{username}</b>
            </span>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded-lg"
              onClick={() => {
                dispatch(logout());
                toast.success("Logged out ✅");
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="text-blue-600 underline" to="/login">
              Login
            </Link>
            <Link className="text-blue-600 underline" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}