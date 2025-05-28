import weatherModel from "../models/weatherModel.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Fetch weather data from external API
export const fetchWeatherData = async (req, res) => {
    try {
        const { location } = req.body;

        if (!location) {
            return res.status(400).json({ error: "❌ Location is required." });
        }

        const apiKey = process.env.WEATHER_API_KEY; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        const weatherData = {
            location: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            pressure: data.main.pressure,
            visibility: data.visibility / 1000, // Convert to km
            sunset: new Date(data.sys.sunset * 1000), // Convert from seconds to milliseconds
        };

        // Save to database
        const weatherRecord = new weatherModel(weatherData);
        await weatherRecord.save();

        res.status(200).json({
            success: true,
            message: "✅ Weather data fetched successfully.",
            weatherData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "❌ Internal server error." });
    }
};