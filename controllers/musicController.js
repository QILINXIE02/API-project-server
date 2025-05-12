import axios from 'axios';

export const getMoodMusic = async (req, res) => {
  const { mood } = req.params;
  try {
    const response = await axios.get('https://api.jamendo.com/v3.0/tracks', {
      params: {
        client_id: process.env.JAMENDO_API_KEY,
        tags: mood,
        format: 'json',
        limit: 10,
      },
    });
    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCityArtists = async (req, res) => {
  const { city } = req.params;
  try {
    const locationRes = await axios.get('https://eu1.locationiq.com/v1/search.php', {
      params: {
        key: process.env.LOCATION_API_KEY,
        q: city,
        format: 'json',
      },
    });

    const { lat, lon } = locationRes.data[0];

    const weatherRes = await axios.get('https://api.weatherbit.io/v2.0/current', {
      params: {
        key: process.env.WEATHER_API_KEY,
        lat,
        lon,
      },
    });

    res.json({ weather: weatherRes.data.data[0], location: { lat, lon } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
