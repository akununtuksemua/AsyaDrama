// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS supaya bisa diakses dari GitHub Pages
app.use(cors());

app.get('/api/stream/:vid', async (req, res) => {
    try {
        const vidId = req.params.vid;
        const apiRes = await fetch(`https://melolo-api-azure.vercel.app/api/melolo/stream/${vidId}`);
        const data = await apiRes.json();
        // Kirim langsung data video
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch stream' });
    }
});

// Optional: proxy trending & latest supaya CORS aman
app.get('/api/trending', async (req, res) => {
    try {
        const apiRes = await fetch('https://melolo-api-azure.vercel.app/api/melolo/trending');
        const data = await apiRes.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch trending' });
    }
});

app.get('/api/latest', async (req, res) => {
    try {
        const apiRes = await fetch('https://melolo-api-azure.vercel.app/api/melolo/latest');
        const data = await apiRes.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch latest' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));