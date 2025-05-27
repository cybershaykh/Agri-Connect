import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: String,
  content: String,
  type: { type: String, enum: ['article', 'video'] },
  url: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const resourceModel = mongoose.models.Resource || mongoose.model("Resource", resourceSchema);

export default resourceModel;