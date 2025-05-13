// routes/weatherRoutes.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(`https://api.weatherbit.io/v2.0/current`, {
      params: {
        city,
        key: process.env.WEATHER_API_KEY,
      },
    });
    res.json(response.data.data[0]);
  } catch (error) {
    console.error('Weather error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

export default router;
