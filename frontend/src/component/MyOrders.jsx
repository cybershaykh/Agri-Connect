import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../component/context/StoreContext";
import Loading from "../component/Loading";

const AllOrders = () => {
  const { url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/all`);
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        console.error("Fetch failed:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching all orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Orders</h1>

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
              {/* Order Info */}
              <div className="flex flex-col gap-3 flex-1">
                <h2 className="font-semibold text-gray-700">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h2>
                <p className="text-sm text-gray-600">
                  Buyer: {order.user?.name || "N/A"} ({order.user?.email || "N/A"})
                </p>

                <div className="flex flex-col gap-3">
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
                      <p className="font-medium">{item.product?.name}</p>
                      <span className="text-gray-500">x {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="text-sm text-gray-600 flex-1">
                <p className="font-semibold">{order.address?.fullName || "N/A"}</p>
                <p>{order.address?.area || "N/A"}</p>
                <p>{`${order.address?.city || "N/A"}, ${order.address?.state || "N/A"}`}</p>
                <p>Pincode: {order.address?.pincode || "N/A"}</p>
                <p>{order.address?.phoneNumber || "N/A"}</p>
              </div>

              {/* Amount & Status */}
              <div className="flex flex-col justify-between text-right text-sm text-gray-600">
                <div>
                  <p className="text-green-700 font-semibold text-lg">
                    ₦{order.amount?.toLocaleString()}
                  </p>
                  <p>Method: {order.method}</p>
                  <p>Payment: {order.paymentStatus}</p>
                  <p>Status: {order.status}</p>
                </div>
                <p className="text-gray-500 text-xs mt-4">
                  Date: {new Date(order.date).toLocaleDateString("en-NG")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
