import mongoose from "mongoose";

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
    orders: [
      {
        items: [
          {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product",},
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
        method: {
          type: String,
          enum: ["COD", "Online"],
          default: "COD",
        },
        paymentStatus: {
          type: String,
          enum: ["Pending", "Paid", "Failed"],
          default: "Pending",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

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
