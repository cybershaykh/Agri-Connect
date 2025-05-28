import express from 'express';
import { fetchWeatherData } from '../controllers/weathetController.js';

const weatherRoute = express.Router();

weatherRoute.get('/current', fetchWeatherData);

export default weatherRoute;