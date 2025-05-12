import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('/tracks', async (req, res) => {
  const { mood, city } = req.query;

  try {
    const response = await axios.get(`https://api.jamendo.com/v3.0/tracks`, {
      params: {
        client_id: process.env.JAMENDO_CLIENT_ID,
        format: 'json',
        limit: 10,
        tags: mood
      },
    });

    res.json(response.data.results);
  } catch (err) {
    console.error('Jamendo error:', err.message);
    res.status(500).json({ error: 'Failed to fetch music data' });
  }
});

export default router;
