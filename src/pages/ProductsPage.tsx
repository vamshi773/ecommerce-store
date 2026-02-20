import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import type { RootState, AppDispatch } from "../store/store";
import { fetchProducts } from "../features/products/productsSlice";

import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  // /products?q=...
  const q = (searchParams.get("q") || "").toLowerCase().trim();

  // ✅ Get whole slice safely
  const productsState = useSelector((state: RootState) => state.products);

  // ✅ fallback: some slices use items instead of products
  const products =
    (productsState as any).products ?? (productsState as any).items ?? [];

  // ✅ fallback: some slices use status instead of loading
  const loading =
    (productsState as any).loading ??
    ((productsState as any).status === "loading") ??
    false;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (!q) return products;
    return products.filter((p: any) =>
      (p.title ?? "").toLowerCase().includes(q)
    );
  }, [products, q]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products Page</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map((p: any) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  image={p.image}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}