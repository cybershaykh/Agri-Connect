import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../component/context/StoreContext";
import axios from "axios";
import Sidebar from "../component/Sidebar";
import toast from "react-hot-toast";

const Orders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/orders/getall`);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-4 md:p-10">
        <h2 className="text-2xl font-semibold text-green-900 mb-6">Customer Orders</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-green-100 text-green-900">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Order ID</th>
                  <th className="text-left px-4 py-3 font-medium">Customer</th>
                  <th className="text-left px-4 py-3 font-medium">Items</th>
                  <th className="text-left px-4 py-3 font-medium">Total</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 truncate">{order._id}</td>
                    <td className="px-4 py-3">{order.customerName || "N/A"}</td>
                    <td className="px-4 py-3">{order.items?.length}</td>
                    <td className="px-4 py-3 font-semibold">₦{order.total}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
