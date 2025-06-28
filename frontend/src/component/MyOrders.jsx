import React, { useEffect, useState, useContext } from "react";
import { PackageCheck } from "lucide-react";
import Sidebar from "../component/Sidebar";
import Loading from "../component/Loading";
import { StoreContext } from "../component/context/StoreContext";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/orders`);
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

  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 px-4 sm:px-6 md:px-10 lg:px-16 py-6">
        <h2 className="text-xl font-semibold text-green-900 mb-4">My Orders</h2>

        {/* Filter dropdown */}
        <div className="mb-4 flex justify-end">
          <select
            className="border px-3 py-2 rounded text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        {loading ? (
          <Loading />
        ) : filteredOrders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex gap-4 items-start w-full md:w-2/5">
                  <div className="p-2 rounded-full bg-green-100">
                    <PackageCheck className="text-green-700 w-6 h-6" />
                  </div>
                  <div className="text-sm text-gray-800 space-y-1">
                    <p className="font-medium text-base">
                      {order.items
                        .map((item) => `${item.product.name} x${item.quantity}`)
                        .join(", ")}
                    </p>
                    <p className="text-gray-500">Items: {order.items.length}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-700 w-full md:w-1/4">
                  <p className="font-medium">{order.address.fullName}</p>
                  <p>{order.address.area}</p>
                  <p>
                    {order.address.city}, {order.address.state}
                  </p>
                  <p>{order.address.phoneNumber}</p>
                </div>

                <div className="text-right w-full md:w-1/4 text-sm space-y-1">
                  <p className="font-bold text-green-800 text-lg">
                    ₦{order.amount.toLocaleString()}
                  </p>
                  <p>Method: COD</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                  <p
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
