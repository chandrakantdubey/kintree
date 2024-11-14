import { useSelector } from "react-redux";
import ProductCard from "../components/ecommerce/productCard";
import ProductFilters from "../components/ecommerce/productFilters";

function Ecommerce() {
  const { filteredItems } = useSelector((state) => state.products);

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-4">Shop Our Products</h1>
          <ProductFilters />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}

export default Ecommerce;
