import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const sampleProducts = [
  {
    name: "Fresh Yam Tubers",
    description: "Premium Nigerian yam, perfect for boiling, frying, or pounding.",
    category: "Root Vegetable",
    rating: 4.7,
    quantity: 50,
    price: 3000,
    image:
      "https://media.istockphoto.com/id/638094208/photo/sweet-potato.jpg?b=1&s=612x612&w=0&k=20&c=s_WNbthr_Jz3Pfu4iS-M1mD023aCrcjjZrJ9f_mzfmk=",
    inStock: false,
    location: "Lagos, Nigeria",
  },
  {
    name: "Organic Cassava",
    description: "Rich in starch, ideal for fufu, garri, and industrial uses.",
    category: "Root Crop",
    rating: 4.5,
    quantity: 100,
    price: 2000,
    image:
      "https://media.istockphoto.com/id/1150496082/photo/fresh-cassava-and-peels-and-slices-on-rustic-wooden-table-top-view.jpg?b=1&s=612x612&w=0&k=20&c=x-BUs7qJl23SRtwq9Nm-6CoW_4rOuV-NflOxwRFPIkw=",
    inStock: true,
    location: "Benue, Nigeria",
  },
  {
    name: "Sweet Potatoes Jumbo",
    description: "Large-size, nutrient-rich sweet potatoes",
    category: "Potatoes",
    rating: 4.5,
    quantity: 100,
    price: 1000,
    image:
      "https://media.istockphoto.com/id/1087192472/photo/sweet-potato-isolated-on-white-background.jpg?b=1&s=612x612&w=0&k=20&c=T7ZXZ8WpJAEvtpzNswz3kUM3lujM-JRXdKpvseaTJQ8=",
    inStock: false,
    location: "Kano, Nigeria",
  },
  // More products added
  {
    name: "Organic Tomatoes",
    description: "Fresh, organic tomatoes perfect for salads and sauces.",
    category: "Vegetables",
    rating: 4.8,
    quantity: 200,
    price: 1500,
    image:
      "https://media.istockphoto.com/id/1285368200/photo/fresh-tomatoes.jpg?b=1&s=612x612&w=0&k=20&c=l1FxTqVlhbRfS8pABHxGkX10-yX7RzEjkYfGOZ0z1Hs=",
    inStock: true,
    location: "Kaduna, Nigeria",
  },
  {
    name: "Brown Rice",
    description: "High-quality brown rice, healthy and nutritious.",
    category: "Grains",
    rating: 4.6,
    quantity: 300,
    price: 2500,
    image:
      "https://media.istockphoto.com/id/1476311640/photo/whole-grain-brown-rice-isolated-on-white-background.jpg?b=1&s=612x612&w=0&k=20&c=EpbELP5-Tp_3nnkFgNQXn-Tb3ss93_nwZgkOG7ymXns=",
    inStock: true,
    location: "Oyo, Nigeria",
  },
];

const Products = () => {
  const [cart, setCart] = useState({}); // { productIndex: quantity }

  const addToCart = (index) => {
    setCart((prevCart) => {
      const currentQty = prevCart[index] || 0;
      // Prevent adding if product is out of stock or max quantity reached
      if (!sampleProducts[index].inStock) return prevCart;
      if (currentQty >= sampleProducts[index].quantity) return prevCart;

      return {
        ...prevCart,
        [index]: currentQty + 1,
      };
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const currentQty = prevCart[index] || 0;
      if (currentQty <= 1) {
        // Remove product from cart if quantity goes to 0
        const newCart = { ...prevCart };
        delete newCart[index];
        return newCart;
      }
      return {
        ...prevCart,
        [index]: currentQty - 1,
      };
    });
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="py-20 bg-white" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          All Products
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 space-y-4 relative"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              {/* Product Image with Availability Badge */}
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

              {/* Product Info */}
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <span className="text-green-600 font-bold text-lg">
                  ₦{product.price}
                </span>
              </div>

              <p className="text-sm text-gray-600">{product.description}</p>

              <div className="text-sm text-gray-500">
                Category: {product.category}
              </div>

              {/* Location */}
              <div className="text-sm text-blue-600 font-semibold flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.656 0 3-1.344 3-3S13.656 5 12 5 9 6.344 9 8s1.344 3 3 3zM12 21c-4 0-6-3-6-6 0-3 3-7 6-7s6 4 6 7c0 3-2 6-6 6z"
                  />
                </svg>
                <span>{product.location}</span>
              </div>

              {/* Rating as stars */}
              <div className="text-yellow-500 text-sm">
                {"★".repeat(Math.floor(product.rating)) +
                  "☆".repeat(5 - Math.floor(product.rating))}
                <span className="text-gray-500 ml-2">
                  ({product.rating.toFixed(1)})
                </span>
              </div>

              <div className="text-sm text-gray-500">Stock: {product.quantity}</div>

              {/* Cart controls + View Details */}
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
                  Add to Cart
                </button>

                <Link
                  to={`/products/${index}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                >
                  View Details
                </Link>

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
