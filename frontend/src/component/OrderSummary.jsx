import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "./context/StoreContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const {
    getCartCount,
    getCartAmount,
    token,
    url,
    clearCart,
    cartItems,
  } = useContext(StoreContext);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const navigate = useNavigate();

  const fetchUserAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const res = await fetch(`${url}/api/address/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.status === 401) {
        toast.error("Unauthorized. Please log in again.");
        return;
      }

      if (data.success) {
        setUserAddresses(data.addresses);
      } else {
        toast.error(data.message || "Failed to fetch addresses");
      }
    } catch (err) {
      toast.error("Error fetching addresses");
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    if (token) fetchUserAddresses();
  }, [token]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address before placing an order.");
      return;
    }

    setIsPlacingOrder(true);

    const orderDetails = {
      items: Object.entries(cartItems).map(([product, quantity]) => ({
        product,
        quantity,
      })),
      address: selectedAddress,
      method: "COD",
      amount: getCartAmount() + Math.floor(getCartAmount() * 0.02),
    };

    try {
      const res = await fetch(`${url}/api/order/place`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Order placed successfully!");
        clearCart();
        setTimeout(() => navigate("/order-placed"), 1500);
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      toast.error("Error placing order");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const totalAmount = getCartAmount() + Math.floor(getCartAmount() * 0.02);

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5 mt-10 md:mt-0">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>
      <hr className="border-gray-500/30 my-5" />

      <div className="space-y-6">
        {/* Address Dropdown */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border rounded">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-5 h-5 float-right transition-transform ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5 max-h-60 overflow-y-auto">
                {loadingAddresses ? (
                  <li className="px-4 py-2 text-gray-500">Loading...</li>
                ) : userAddresses.length === 0 ? (
                  <li className="px-4 py-2 text-gray-500">No addresses found</li>
                ) : (
                  userAddresses.map((address, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                      onClick={() => handleAddressSelect(address)}
                    >
                      {address.fullName}, {address.area}, {address.pincode},{" "}
                      {address.city}, {address.state}
                    </li>
                  ))
                )}
                <li
                  onClick={() => navigate("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center text-green-700"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="w-full p-2.5 border text-gray-600"
            />
            <button className="bg-green-600 text-white px-9 py-2 hover:bg-green-700">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        {/* Totals */}
        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items ({getCartCount()})</p>
            <p className="text-gray-800">₦{getCartAmount().toLocaleString()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              ₦{Math.floor(getCartAmount() * 0.02).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>₦{totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        disabled={isPlacingOrder}
        className={`w-full py-3 mt-5 text-white font-medium transition duration-300 ${
          isPlacingOrder
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isPlacingOrder ? (
          <div className="flex items-center justify-center gap-2">
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
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Placing Order...
          </div>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );
};

export default OrderSummary;
