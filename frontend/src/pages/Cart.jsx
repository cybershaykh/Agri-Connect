import React, { useContext, useState } from "react";
import { StoreContext } from "../component/context/StoreContext.jsx";
// import foodItems from "../assets/assets.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import sampleProducts from "../assets/assets.jsx";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = sampleProducts.reduce((acc, item) => {
    return acc + item.price * (cartItems[item.id] || 0);
  }, 0);

  const deliveryFee = subtotal > 0 && !isPromoApplied ? 2 : 0;
  const total = subtotal + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === "free") {
      setIsPromoApplied(true);
      toast.success("Promo applied! Free delivery 🎉");
    } else {
      setIsPromoApplied(false);
      toast.error("Invalid promo code ❌");
    }
  };

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/order");
    }, 1000); // simulate loading delay
  };

  return (
    <div className="w-full mt-20 px-4 py-8 md:px-8 lg:px-16">
      <ToastContainer />
      <div className="space-y-8">
        {/* Cart Items Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-6 gap-4 px-4 sm:px-6 py-4 bg-gray-100 font-semibold text-sm text-gray-700">
            <p>Items</p>
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
                  <div key={item.id}>
                    <div className="grid grid-cols-6 items-center gap-4 px-4 sm:px-6 py-4 text-sm md:text-base">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <p className="col-span-1 truncate">{item.name}</p>
                      <p>${item.price.toFixed(2)}</p>
                      <p>{cartItems[item.id]}</p>
                      <p>${(item.price * cartItems[item.id]).toFixed(2)}</p>
                      <p
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 cursor-pointer font-bold"
                      >
                        ×
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              } else return null;
            })}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Promo Code Section */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6">
            <p className="text-sm mb-2">If you have a promo code, enter it here:</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition duration-200"
              >
                APPLY
              </button>
            </div>
          </div>

          {/* Total Section */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              {subtotal > 0 && !isPromoApplied && (
                <>
                  <hr />
                  <div className="flex justify-between">
                    <p>Delivery Fee</p>
                    <p>${deliveryFee.toFixed(2)}</p>
                  </div>
                </>
              )}
              <hr />
              <div className="flex justify-between font-semibold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className={`mt-6 w-full text-white py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
                subtotal > 0
                  ? "bg-orange-600 hover:bg-orange-700"
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
      </div>
    </div>
  );
};

export default Cart;
