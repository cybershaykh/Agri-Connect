import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["superadmin", "admin"],
      default: "admin",
    },

    isAdmin: {
      type: Boolean,
      default: true, // ensures consistency in middleware
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

adminSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
