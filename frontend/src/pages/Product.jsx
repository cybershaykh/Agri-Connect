import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ShoppingCart, Minus, Plus, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import sampleProducts from "../assets/assets";


// Extract unique categories and locations
const allCategories = [
  "All",
  ...new Set(sampleProducts.map((p) => p.category)),
];
const allLocations = ["All", ...new Set(sampleProducts.map((p) => p.location))];

const Products = () => {
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const addToCart = (index) => {
    setCart((prevCart) => {
      const currentQty = prevCart[index] || 0;
      if (
        !sampleProducts[index].inStock ||
        currentQty >= sampleProducts[index].quantity
      )
        return prevCart;
      return { ...prevCart, [index]: currentQty + 1 };
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const currentQty = prevCart[index] || 0;
      if (currentQty <= 1) {
        const newCart = { ...prevCart };
        delete newCart[index];
        return newCart;
      }
      return { ...prevCart, [index]: currentQty - 1 };
    });
  };

  // Filter and sort products
  const filteredProducts = sampleProducts
    .filter(
      (p) =>
        (selectedCategory === "All" || p.category === selectedCategory) &&
        (selectedLocation === "All" || p.location === selectedLocation)
    )
    .sort((a, b) => {
      if (sortOption === "priceLow") return a.price - b.price;
      if (sortOption === "priceHigh") return b.price - a.price;
      if (sortOption === "ratingHigh") return b.rating - a.rating;
      if (sortOption === "ratingLow") return a.rating - b.rating;
      return 0;
    });

  return (
    <section className="py-20 bg-white" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <div className="text-center my-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800">
            Explore Fresh Farm Products near you
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Browse a wide variety of agricultural products sourced directly from
            trusted Nigerian farmers. Get fresh, affordable, and quality produce
            all in one place.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-between items-center mb-10 gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1 rounded-full border transition text-sm ${
                  selectedCategory === cat
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-green-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Location Filter */}
          <select
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border rounded px-4 py-2 text-sm text-gray-700"
            value={selectedLocation}
          >
            {allLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded px-4 py-2 text-sm text-gray-700"
            value={sortOption}
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="ratingHigh">Rating: High to Low</option>
            <option value="ratingLow">Rating: Low to High</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 space-y-4 relative"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div
                  className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-full font-semibold select-none ${
                    product.inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <span className="text-green-600 font-bold text-lg">
                  ${product.price}
                </span>
              </div>

              <p className="text-sm text-gray-600">{product.description}</p>
              
              <div className="text-sm text-gray-500">
                Category: {product.category}
              </div>
              <div className="text-sm text-blue-600 font-semibold flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{product.location}</span>
              </div>

              <div className="text-yellow-500 text-sm">
                {"★".repeat(Math.floor(product.rating)) +
                  "☆".repeat(5 - Math.floor(product.rating))}
                <span className="text-gray-500 ml-2">
                  ({product.rating.toFixed(1)})
                </span>
              </div>

              <div className="text-sm text-gray-500">
                Stock: {product.quantity}
              </div>
               <Link
  to={product.href}
  className="text-green-700 text-sm hover:underline"
>
  View Details
</Link>

              <div className="flex items-center space-x-3 pt-3">
                <button
                  disabled={!product.inStock}
                  onClick={() => addToCart(index)}
                  className={`flex items-center px-3 py-1 rounded text-white text-sm transition ${
                    product.inStock
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-1" />
                </button>

                {cart[index] && (
                  <div className="ml-auto flex items-center space-x-2">
                    <button
                      onClick={() => removeFromCart(index)}
                      className="p-1 rounded bg-red-200 text-red-700 hover:bg-red-300 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-semibold">{cart[index]}</span>
                    <button
                      onClick={() => addToCart(index)}
                      className="p-1 rounded bg-green-200 text-green-700 hover:bg-green-300 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
