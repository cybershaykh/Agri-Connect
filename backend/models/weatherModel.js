import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
  location: { type: String, required: true },
  temperature: { type: Number, required: true },
  condition: { type: String, required: true },
  humidity: { type: Number, required: true },
  windSpeed: { type: Number, required: true },
  pressure: { type: Number, required: true },
  visibility: { type: Number, required: true },
  sunset: { type: Date, required: true },
  fetchedAt: { type: Date, default: Date.now },
});

const weatherModel = mongoose.models.Weather || mongoose.model('Weather', weatherSchema);

export default weatherModel;