import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  amount: Number,
  address: {
    fullName: String,
    phoneNumber: String,
    pincode: String,
    area: String,
    city: String,
    state: String,
  },
  method: { type: String, default: "COD" },
  paymentStatus: { type: String, default: "Pending" },
  date: Date,
});

export default mongoose.model("Order", orderSchema);
