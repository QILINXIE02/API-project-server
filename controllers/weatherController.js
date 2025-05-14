import axios from 'axios';

export const getWeather = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await axios.get('https://api.weatherbit.io/v2.0/current', {
      params: {
        key: process.env.WEATHER_API_KEY,
        city,
      },
    });

    res.json(response.data.data[0]);
  } catch (error) {
    console.error('Weather fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};
