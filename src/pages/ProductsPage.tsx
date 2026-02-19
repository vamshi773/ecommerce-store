import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import type { RootState } from "../store/store";
import { fetchProducts } from "../features/products/productsSlice";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
  const dispatch = useDispatch<any>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default"); // default | priceLow | priceHigh

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((p) => p.category)));
    return ["all", ...unique];
  }, [items]);

  const filtered = useMemo(() => {
    let list = [...items];

    // filter by search
    if (query) {
      list = list.filter((p) => p.title.toLowerCase().includes(query));
    }

    // filter by category
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    // sort
    if (sort === "priceLow") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [items, query, category, sort]);

  if (loading) return <div className="p-10 text-xl">Loading products...</div>;
  if (error) return <div className="p-10 text-xl">{error}</div>;

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex gap-3">
          <select
            className="border rounded-lg px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="border rounded-lg px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
          </select>
        </div>
      </div>

      <div className="mb-4 text-gray-600">
        Showing <span className="font-semibold">{filtered.length}</span> products
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            price={Math.round(p.price * 80)}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
}


  