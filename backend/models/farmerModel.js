import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
 {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    farmName: { type: String, required: true },
    farmSize: { type: String, required: true },
    location: { type: String, required: true },
    verified: { type: Boolean, default: false },
    role: { type: String, enum: ['farmer', 'buyer', 'admin'], default: 'farmer' },
    isBlocked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { minimize: false }
);

farmerSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const farmerModel =
  mongoose.models.farmer || mongoose.model("farmer", farmerSchema);
export default farmerModel;
