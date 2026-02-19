import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);

  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === productId)
  );

  if (!product) {
    return <div className="p-10 text-xl">Product not found ❌</div>;
  }

  return (
    <div className="p-8">
      <button
        className="mb-6 px-4 py-2 border rounded-lg"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border rounded-lg p-6 bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-contain"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-6 text-2xl font-bold text-orange-600">
            ₹{Math.round(product.price * 80)}
          </div>

          <div className="mt-4 text-gray-600">
            Category: <span className="font-semibold">{product.category}</span>
          </div>

          {product.rating && (
            <div className="mt-2 text-gray-600">
              Rating:{" "}
              <span className="font-semibold">
                {product.rating.rate} ⭐ ({product.rating.count})
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
