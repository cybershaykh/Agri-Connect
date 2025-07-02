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
    user,
  } = useContext(StoreContext);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch user addresses
  const fetchUserAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const res = await fetch(`${url}/api/address/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      console.error("Address fetch error:", err.message);
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

  // ✅ Create order & send to backend
  const createOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address before placing an order.");
      return;
    }

    const orderDetails = {
      items: Object.entries(cartItems).map(([productId, quantity]) => ({
        productId,
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
        clearCart(); // ✅ clear cart after order
        setTimeout(() => navigate("/order-placed"), 1500);
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Create order error:", err.message);
      toast.error("Error placing order");
    }
  };

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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
                      {address.fullName}, {address.area}, {address.pincode}, {address.city}, {address.state}
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

        {/* Promo */}
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
            <p className="text-gray-800">₦{getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">₦{Math.floor(getCartAmount() * 0.02)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>₦{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-green-600 text-white py-3 mt-5 hover:bg-green-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
