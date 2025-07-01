import React, { useEffect, useState, useContext } from "react";
import { Package } from "lucide-react";
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
              className="bg-white border rounded-lg p-5 shadow-sm flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center"
            >
              {/* Left Section: Images + Item Names */}
              <div className="flex flex-col sm:flex-row items-start gap-4 flex-1">
                <div className="flex gap-2 flex-wrap">
                  {order.items.map((item, idx) =>
                    item.product?.image?.[0] ? (
                      <img
                        key={idx}
                        src={item.product.image[0]}
                        alt={item.product.name}
                        className="w-12 h-12 object-contain rounded border border-gray-200"
                      />
                    ) : (
                      <Package key={idx} className="w-10 h-10 text-green-600" />
                    )
                  )}
                </div>

                <div className="text-sm text-gray-700">
                  <p className="font-medium text-base mb-1">
                    {order.items
                      .map((item) =>
                        item.product?.name
                          ? `${item.product.name} x ${item.quantity}`
                          : `Item x ${item.quantity}`
                      )
                      .join(", ")}
                  </p>
                  <p className="text-xs text-gray-500">
                    Items: {order.items.length}
                  </p>
                </div>
              </div>

              {/* Middle Section: Shipping Address */}
              <div className="text-sm text-gray-600 flex-1 sm:text-left">
                <p className="font-medium">{order.address.fullName}</p>
                <p>{order.address.area}</p>
                <p>{`${order.address.city}, ${order.address.state}`}</p>
                <p>{order.address.phoneNumber}</p>
              </div>

              {/* Right Section: Order Info */}
              <div className="flex flex-col gap-1 text-sm text-gray-600 text-right">
                <p className="font-semibold text-green-700">
                  ₦{order.amount.toLocaleString()}
                </p>
                <p>Method: {order.method}</p>
                <p>
                  Date: {new Date(order.date).toLocaleDateString("en-NG")}
                </p>
                <p>Payment: {order.paymentStatus}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrder;
