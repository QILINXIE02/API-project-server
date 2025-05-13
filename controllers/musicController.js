// routes/musicRoutes.js
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  const { mood, city } = req.query;

  // Check if the mood and city are provided in the request
  if (!mood || !city) {
    return res.status(400).json({ error: 'Mood and city are required' });
  }

  // Simulate music data based on the mood and city
  const musicData = [
    { title: `Romantic Song 1 in ${city}`, artist: 'Artist A' },
    { title: `Romantic Song 2 in ${city}`, artist: 'Artist B' },
  ];

  return res.json(musicData);
});

export default router;
