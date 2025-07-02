import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});

const addressSchema = new mongoose.Schema(
  {
    fullName: String,
    phoneNumber: String,
    pincode: String,
    area: String,
    city: String,
    state: String,
  },
  { timestamps: true }
);
const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  amount: Number,
  address: addressSchema,
  method: String,
  paymentStatus: String,
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  date: Date,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartItems: { type: Object, default: {} },
    addresses: [
      {
        fullName: String,
        phoneNumber: String,
        pincode: String,
        area: String,
        city: String,
        state: String,
      },
    ],
    orders: [orderSchema],
    verified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["farmer", "buyer", "admin"],
      default: "buyer",
    },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { minimize: false }
);

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
