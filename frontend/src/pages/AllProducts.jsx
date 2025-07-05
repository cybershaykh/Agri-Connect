import { useContext, useState } from "react";
import ProductCard from "../component/ProductCard";
import { StoreContext } from "../component/context/StoreContext";

const AllProducts = () => {
  const { products } = useContext(StoreContext);

  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const uniqueLocations = [...new Set(products.map((p) => p.location))];
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchLocation = locationFilter ? product.location === locationFilter : true;
    const matchCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchPrice = maxPrice ? product.offerPrice <= maxPrice : true;
    return matchLocation && matchCategory && matchPrice;
  });

  return (
    <div className="px-4 md:px-12 lg:px-24 pt-12 bg-white min-h-screen">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800">Explore Fresh Farm Products</h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
          Buy directly from trusted Nigerian farmers. Fresh, affordable, and high-quality produce—all in one place.
        </p>
        <div className="w-16 h-1 bg-green-600 rounded-full mx-auto mt-3"></div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <select
          className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">📍 All Locations</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select
          className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">🌿 All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          placeholder="💰 Max Price (₦)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
