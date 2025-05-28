import express from 'express';
import { fetchWeatherData } from '../controllers/weatherController.js';

const weatherRoute = express.Router();

weatherRoute.get('/current', fetchWeatherData);

export default weatherRoute;