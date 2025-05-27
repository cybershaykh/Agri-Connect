import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: {type: Object, default: {}},
    verified: { type: Boolean, default: false },
    role: { type: String, enum: ['farmer', 'buyer', 'admin'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { minimize: false }
);

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
