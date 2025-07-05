import React, { useEffect, useState, useContext } from "react";
import Loading from "../component/Loading.jsx";
import axios from "axios";
import { StoreContext } from "../component/context/StoreContext.jsx";

const UserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url } = useContext(StoreContext);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        console.error("Error:", res.data.message);
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-16 lg:px-32 py-6 min-h-screen bg-gray-50">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
        My Orders
      </h2>

      {loading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-6 sm:flex-row sm:justify-between"
            >
              {/* Products */}
              <div className="flex flex-col gap-3 flex-1">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <div className="bg-gray-100 rounded p-1">
                      {item.product?.image?.[0] ? (
                        <img
                          src={item.product.image[0]}
                          alt={item.product.name || "Product"}
                          className="w-14 h-14 object-cover rounded"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>
                    <p className="font-medium">{item.product?.name || "Unnamed Product"}</p>
                    <span className="text-gray-500">x {item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              <div className="text-sm text-gray-600 flex-1">
                <p className="font-semibold">{order.address?.fullName || "N/A"}</p>
                <p>{order.address?.area || "N/A"}</p>
                <p>{`${order.address?.city || "N/A"}, ${order.address?.state || "N/A"}`}</p>
                <p>Pincode: {order.address?.pincode || "N/A"}</p>
                <p>{order.address?.phoneNumber || "N/A"}</p>
              </div>

              {/* Order Info */}
              <div className="flex flex-col gap-1 text-sm text-gray-600 text-right">
                <p className="font-semibold text-green-700">
                  ₦{order.amount?.toLocaleString() || "0"}
                </p>
                <p>Method: {order.method || "N/A"}</p>
                <p>
                  Date:{" "}
                  {order.date
                    ? new Date(order.date).toLocaleDateString("en-NG")
                    : "N/A"}
                </p>
                <p>Payment: {order.paymentStatus || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrder;
