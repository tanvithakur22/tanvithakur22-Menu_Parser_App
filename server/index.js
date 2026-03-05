const express = require('express');
const cors = require('cors');
require('dotenv').config();

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());

const SERPAPI_KEY = process.env.SERPAPI_KEY;

app.get('/api/images', async (req, res) => {
  const q = req.query.q;
  const limit = parseInt(req.query.limit, 10) || 4;

  if (!q) return res.status(400).json({ error: 'Missing q parameter' });
  if (!SERPAPI_KEY) return res.status(500).json({ error: 'Missing SERPAPI_KEY' });

  const params = new URLSearchParams({
    engine: 'google_images',
    q,
    num: String(limit),
    api_key: SERPAPI_KEY,
  });

  const url = `https://serpapi.com/search.json?${params.toString()}`;

  try {
    const resp = await fetch(url);
    const data = await resp.json();

    const results = data.image_results || data.images_results || [];
    const images = results
      .slice(0, limit)
      .map(img => img.original || img.thumbnail)
      .filter(Boolean);

    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
