import axios from 'axios';

export const getMusic = async (req, res) => {
  const { mood, city } = req.query;

  if (!mood || !city) {
    return res.status(400).json({ error: 'Mood and city are required' });
  }

  try {
    const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'tag.gettoptracks',
        tag: mood,
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
        limit: 10,
      },
    });

    const tracks = response.data.tracks?.track || [];
    res.json(tracks);
  } catch (error) {
    console.error('Music fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch music' });
  }
};
