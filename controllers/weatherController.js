import axios from 'axios';

export const getWeather = async (req, res) => {
  const { city } = req.params;
  try {
    const response = await axios.get('https://api.weatherbit.io/v2.0/current', {
      params: {
        key: process.env.WEATHER_API_KEY,
        city,
      },
    });
    res.json(response.data.data[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching weather data." });
  }
};
