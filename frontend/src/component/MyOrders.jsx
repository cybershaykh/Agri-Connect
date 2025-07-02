import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../component/Loading";
import { StoreContext } from "../component/context/StoreContext";

const AllOrders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl md:text-2xl font-semibold text-green-800 mb-6">
        All Orders (Admin)
      </h2>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-sm p-4 md:p-6 flex flex-col gap-4"
            >
              {/* User Email */}
              <p className="text-sm text-gray-600">
                <span className="font-semibold">User:</span>{" "}
                {order.user.email}
              </p>

              {/* Product Items */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-sm text-gray-700">
                    <img
                      src={item.product?.image?.[0]}
                      alt={item.product?.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <div className="flex flex-col">
                      <p className="font-medium">{item.product?.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Address & Info */}
              <div className="flex flex-col md:flex-row md:justify-between gap-4 pt-3 border-t">
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="font-semibold">Shipping Address:</p>
                  <p>{order.address.fullName}</p>
                  <p>{order.address.area}</p>
                  <p>{order.address.city}, {order.address.state}</p>
                  <p>Pincode: {order.address.pincode}</p>
                  <p>Phone: {order.address.phoneNumber}</p>
                </div>

                <div className="text-sm text-gray-700 text-right space-y-1">
                  <p className="font-semibold">Order Summary:</p>
                  <p>Amount: ₦{order.amount.toLocaleString()}</p>
                  <p>Payment: {order.paymentStatus}</p>
                  <p>Method: {order.method}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString("en-NG")}</p>
                  <p>Status: {order.status || "Pending"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
