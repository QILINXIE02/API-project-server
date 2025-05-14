import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const { mood, city } = req.query;
  if (!mood || !city) return res.status(400).json({ error: 'Mood and city are required' });

  try {
    const response = await axios.get('https://api.jamendo.com/v3.0/tracks', {
      params: {
        client_id: process.env.JAMENDO_API_KEY,
        mood,
        format: 'json',
        limit: 5,
      },
    });

    const tracks = response.data.results.map((track) => ({
      id: track.id,
      name: track.name,
      artist_name: track.artist_name,
      audio: track.audio,
    }));

    res.json(tracks);
  } catch (err) {
    console.error('Jamendo API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch music' });
  }
});

export default router;
