import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock < 5 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Low Stock
          </span>
        )}
      </div>
      <div className="p-4">
        <h3
          className="text-lg font-semibold mb-1 truncate"
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2 h-[40px]">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold">${product.price}</span>
          <span className="text-sm text-gray-500">{product.stock} left</span>
        </div>
        <button
          onClick={() => dispatch(addToCart(product))}
          disabled={product.stock === 0}
          className="w-full bg-purple text-white py-2 rounded-md hover:bg-opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
