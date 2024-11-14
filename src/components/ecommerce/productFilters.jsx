import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, sortProducts } from "../../store/productSlice";
import { categories } from "../../data/product";

function ProductFilters() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory,
  );

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => dispatch(filterByCategory(category))}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === category
                ? "bg-purple text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <select
        onChange={(e) => dispatch(sortProducts(e.target.value))}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">Sort by</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}

export default ProductFilters;
