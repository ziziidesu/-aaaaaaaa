import express from 'express';
import fetch from 'node-fetch';  // `node-fetch`もESモジュール対応
const app = express();
const port = process.env.PORT || 3000;

// 静的ファイルを提供する
app.use(express.static('public'));

// 動画を埋め込むルート
app.get('/stream', async (req, res) => {
    const videoId = req.query.videoId;
    const apiUrl = `https://watawatawata.glitch.me/api/${videoId}?token=wakameoishi`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Main API failed');
        const data = await response.json();
        if (data.stream_url) {
            res.send(`
                <video controls width="640" height="360">
                    <source src="${data.stream_url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `);
        } else {
            res.status(404).send('Stream URL not found.');
        }
    } catch (error) {
        res.status(500).send('Error fetching video data.');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
