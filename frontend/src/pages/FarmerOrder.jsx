import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../component/Loading";
import { StoreContext } from "../component/context/StoreContext";

const FarmerOrder = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/farmer`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setOrders(res.data.orders || []);
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
    fetchOrders();
  }, []);

  const handleStatusChange = async (userId, orderId, newStatus) => {
    try {
      await axios.put(
        `${url}/api/order/update-status`,
        { userId, orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl md:text-2xl font-semibold text-green-800 mb-6">
        Customer Orders
      </h2>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No customer orders yet.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order, i) => (
            <div
              key={i}
              className="bg-white border rounded-lg shadow-sm p-4 md:p-6 flex flex-col gap-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <div className="text-sm text-gray-800">
                  <p className="font-semibold">Customer Info:</p>
                  <p>{order.address.fullName}</p>
                  <p>{order.address.area}</p>
                  <p>
                    {order.address.city}, {order.address.state}
                  </p>
                  <p>Pincode: {order.address.pincode}</p>
                  <p>Phone: {order.address.phoneNumber}</p>
                </div>

                <div className="text-sm text-gray-800 sm:text-right mt-4 sm:mt-0">
                  <p className="font-semibold">Order Summary:</p>
                  <p>Total: ₦{order.amount.toLocaleString()}</p>
                  <p>Payment: {order.paymentStatus}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Product Items */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700">Products Ordered:</p>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-sm text-gray-700">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <div className="flex flex-col">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-2 border-t mt-4">
                <p className="text-sm font-semibold text-gray-600">
                  Current Status:{" "}
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Shipped"
                        ? "bg-indigo-100 text-indigo-700"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}>
                    {order.status}
                  </span>
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="text-sm text-gray-600">Change Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.user._id, order._id, e.target.value)
                    }
                    className="border px-3 py-1 rounded text-sm"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FarmerOrder;
