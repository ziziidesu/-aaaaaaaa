import express from 'express';
import fetch from 'node-fetch';  // `node-fetch`もESモジュール対応
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));  // index.htmlをpublicフォルダに配置

// POSTリクエストを受けて動画IDからストリームURLを取得
app.post('/getStreamUrl', async (req, res) => {
    const videoUrl = req.query.videoUrl;
    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        const response = await fetch(`https://watawatawata.glitch.me/api/${videoId}?token=wakameoishi`);
        const data = await response.json();
        
        if (data.streamUrl) {
            res.json({ streamUrl: data.streamUrl });
        } else {
            res.status(404).json({ error: 'Stream URL not found' });
        }
    } catch (error) {
        console.error('Error fetching stream URL:', error);
        res.status(500).json({ error: 'Error fetching stream URL' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
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
