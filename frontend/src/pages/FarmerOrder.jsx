import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../component/Loading";
import { StoreContext } from "../component/context/StoreContext";

const FarmerOrders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setOrders(res.data.orders || []);
      } else {
        toast.error(res.data.message || "Failed to load orders");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
      const res = await axios.put(
        `${url}/api/order/payment`,
        { orderId, paymentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Payment status updated");
        fetchOrders();
      } else {
        toast.error(res.data.message || "Failed to update payment status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update payment status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Farmer Orders</h1>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow border rounded-lg p-4 flex flex-col gap-6 sm:flex-row sm:justify-between"
            >
              {/* Buyer Info */}
              <div className="flex flex-col gap-3 flex-1">
                <h2 className="font-semibold text-gray-700">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h2>
                <p className="text-sm text-gray-600">
                  Buyer: {order.user?.name || "N/A"} ({order.user?.email || "N/A"})
                </p>

                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="bg-gray-100 p-1 rounded">
                      {item.product?.image?.[0] && (
                        <img
                          src={item.product.image[0]}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded"
                        />
                      )}
                    </div>
                    <p className="font-medium">{item.product?.name || "Unnamed Product"}</p>
                    <span className="text-gray-500">x {item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Address */}
              <div className="text-sm text-gray-600 flex-1">
                <p className="font-semibold">{order.address?.fullName || "N/A"}</p>
                <p>{order.address?.area || "N/A"}</p>
                <p>{`${order.address?.city || "N/A"}, ${order.address?.state || "N/A"}`}</p>
                <p>Pincode: {order.address?.pincode || "N/A"}</p>
                <p>{order.address?.phoneNumber || "N/A"}</p>
              </div>

              {/* Payment Info */}
              <div className="text-sm text-right text-gray-600 flex flex-col justify-between">
                <div>
                  <p className="text-green-700 font-semibold text-lg">
                    ₦{order.amount?.toLocaleString()}
                  </p>
                  <p>Method: {order.method}</p>
                  <p>Payment: {order.paymentStatus}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString("en-NG")}</p>
                </div>

                <div className="mt-3">
                  <label className="block mb-1 font-medium">Update Payment Status:</label>
                  <select
                    className="border rounded px-2 py-1 w-full"
                    value={order.paymentStatus}
                    onChange={(e) => updatePaymentStatus(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Refunded">Refunded</option>
                    <option value="Cancelled">Cancelled</option>
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

export default FarmerOrders;
