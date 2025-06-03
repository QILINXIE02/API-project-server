import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  const { mood = 'happy' } = req.query;

  try {
    const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
      params: {
        method: 'tag.gettoptracks',
        tag: mood,
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
        limit: 5,
      },
    });

    const tracks = await Promise.all(response.data.tracks.track.map(async (track) => {
      let bio = '';
      let tags = [];

      try {
        const artistInfo = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
          params: {
            method: 'artist.getinfo',
            artist: track.artist.name,
            api_key: process.env.LASTFM_API_KEY,
            format: 'json',
          },
        });

        bio = artistInfo.data.artist.bio.summary;
        tags = artistInfo.data.artist.tags.tag.map(t => t.name);
      } catch (err) {
        console.error('Artist info error:', err.message);
      }

      return {
        title: track.name,
        artist: track.artist.name,
        bio,
        tags,
        playLink: `https://www.youtube.com/results?search_query=${encodeURIComponent(track.name + ' ' + track.artist.name)}`
      };
    }));

    res.json(tracks);
  } catch (err) {
    console.error('LastFM API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch music' });
  }
});

export default router;
