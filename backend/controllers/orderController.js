import userModel from "../models/userModel.js";

export const placeOrder = async (req, res) => {
  const { items, amount, address, method = "COD" } = req.body;

  if (!items || !amount || !address) {
    return res.status(400).json({ success: false, message: "Missing order data" });
  }

  try {
    const user = await userModel.findById(req.user._id);

    const order = {
      items,
      amount,
      address,
      method,
      paymentStatus: method === "COD" ? "Pending" : "Paid",
      date: new Date(),
    };

    user.orders.push(order);
    await user.save();

    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error placing order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("orders.items.product");

    res.status(200).json({ success: true, orders: user.orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};
