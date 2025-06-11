import React, { useContext, useState } from "react";
import { StoreContext } from "../component/context/StoreContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import sampleProducts from "../assets/assets.jsx";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log("cart items",cartItems)

  const subtotal = sampleProducts.reduce((acc, item) => {
    return acc + item.price * (cartItems[item.id] || 0);
  }, 0);

  const deliveryFee = subtotal > 0 ? 2 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/order");
    }, 1000);
  };

  return (
    <div className="w-full mt-20 px-4 py-10 md:px-12 lg:px-24 bg-[#f9fafb] min-h-screen">
      <ToastContainer />

      {/* Cart Items Table */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-10">
        <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-green-100 font-semibold text-sm text-gray-700">
          <p>Item</p>
          <p className="col-span-1">Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {Array.isArray(sampleProducts) &&
        sampleProducts.map((item) => {
          if (cartItems[item.id] > 0) {
            return (
              <div key={item.id} className="border-b">
                <div className="grid grid-cols-6 items-center gap-4 px-6 py-4 text-sm md:text-base">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md shadow-sm"
                  />
                  <p className="col-span-1 truncate text-gray-800">{item.name}</p>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">{cartItems[item.id]}</p>
                  <p className="font-semibold text-gray-800">
                    ${(item.price * cartItems[item.id]).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 font-bold hover:scale-110 transition transform duration-200"
                    title="Remove item"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Total Section */}
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
        <div className="flex justify-between text-sm text-gray-700">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        {subtotal > 0 && (
          <div className="flex justify-between text-sm text-gray-700">
            <p>Delivery Fee</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
        )}
        <hr />
        <div className="flex justify-between font-semibold text-lg">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>

        <button
          onClick={handleCheckout}
          className={`mt-6 w-full text-white py-3 rounded-lg text-lg font-semibold transition duration-200 flex items-center justify-center gap-2 ${
            subtotal > 0
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={subtotal === 0 || isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "PROCEED TO CHECKOUT"
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
