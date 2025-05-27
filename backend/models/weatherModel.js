import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  location: String,
  data: Object,
  fetchedAt: { type: Date, default: Date.now },
});

const weatherModel = mongoose.models.Weather || mongoose.model('Weather', weatherSchema);

export default weatherModel;