import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const reviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default reviewModel;
