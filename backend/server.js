import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import resourceRoute from './routes/resourceRoute.js';
import marketPriceRoute from './routes/marketPriceRoute.js';
import adminRoute from './routes/adminRoute.js';
import weatherRoute from './routes/weatherRoute.js';
import farmerRoute from './routes/farmerRoute.js';
import addAddressRoute from './routes/addAddressRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/api/user", userRoute);
app.use("/api/farmer", farmerRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);
app.use("/api/resource", resourceRoute);
app.use("/api/marketprice", marketPriceRoute);
app.use("/api/admin", adminRoute);
app.use("/api/address", addAddressRoute);
app.use("/api/weather", weatherRoute);

app.get('/', (req, res) => {
    res.send('Hello from the backend server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});