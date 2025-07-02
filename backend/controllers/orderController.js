import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// ✅ Place an Order
export const placeOrder = async (req, res) => {
  const { items, amount, address, method = "COD" } = req.body;

  if (!items || !amount || !address) {
    return res.status(400).json({
      success: false,
      message: "Missing order data",
    });
  }

  try {
    const user = await userModel.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const paymentStatus = method === "COD" ? "Pending" : "Paid";

    // ✅ Save to Order collection
    const newOrder = new orderModel({
      user: user._id,
      items,
      amount,
      address,
      method,
      paymentStatus,
      status: "Pending",
    });

    await newOrder.save();

    // ✅ Save to embedded user.orders[]
    user.orders.push({
      items,
      amount,
      address,
      method,
      paymentStatus,
      date: newOrder.date,
      status: "Pending",
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("❌ Order placement error:", err);
    res.status(500).json({ success: false, message: "Server error placing order" });
  }
};

// ✅ Get Orders for Logged-In User
export const getUserOrders = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id)
      .populate("orders.items.product", "name image offerPrice");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, orders: user.orders });
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// ✅ Admin: Get All Orders from All Users
export const getAllOrders = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .select("email orders")
      .populate("orders.items.product", "name image offerPrice");

    const allOrders = [];

    users.forEach(user => {
      user.orders.forEach(order => {
        allOrders.push({
          user: {
            _id: user._id,
            email: user.email,
          },
          ...order.toObject(),
        });
      });
    });

    res.status(200).json({ success: true, orders: allOrders });
  } catch (err) {
    console.error("❌ Error fetching all orders:", err);
    res.status(500).json({ success: false, message: "Error fetching all orders" });
  }
};


// ✅ Farmer: Update Order Status
export const updateOrderStatus = async (req, res) => {
  const { userId, orderId, status } = req.body;

  if (!userId || !orderId || !status) {
    return res.status(400).json({ success: false, message: "Missing required data" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const order = user.orders.id(orderId);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = status;
    await user.save();

    res.status(200).json({ success: true, message: `Order updated to ${status}`, order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// ✅ Get all orders that contain this farmer's products
export const getFarmerOrders = async (req, res) => {
  const farmerId = req.user._id;

  try {
    const users = await userModel
      .find({ "orders.items.product": { $exists: true } })
      .populate("orders.items.product", "name image offerPrice farmer");

    const farmerOrders = [];

    users.forEach(user => {
      user.orders.forEach(order => {
        const filteredItems = order.items.filter(
          item => item.product?.farmer?.toString() === farmerId.toString()
        );

        if (filteredItems.length > 0) {
          farmerOrders.push({
            user: { _id: user._id, email: user.email },
            _id: order._id,
            items: filteredItems,
            amount: order.amount,
            address: order.address,
            method: order.method,
            paymentStatus: order.paymentStatus,
            status: order.status,
            date: order.date,
          });
        }
      });
    });

    res.status(200).json({ success: true, orders: farmerOrders });
  } catch (err) {
    console.error("Error fetching farmer orders:", err);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};
