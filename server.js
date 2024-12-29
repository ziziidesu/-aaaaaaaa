import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // publicディレクトリから静的ファイルを提供

// 動画IDを受け取り、ストリームURLを取得するAPIエンドポイント
app.get('/getStreamUrl', async (req, res) => {
    const videoId = req.query.videoId;
    if (!videoId) {
        return res.status(400).json({ error: 'Missing videoId parameter' });
    }

    try {
        const apiResponse = await fetch(`https://watawatawata.glitch.me/api/${videoId}?token=wakameoishi`);
        const data = await apiResponse.json();

        if (data.streamUrl) {
            res.json({ streamUrl: data.streamUrl });
        } else {
            res.status(404).json({ error: 'Stream URL not found' });
        }
    } catch (error) {
        console.error('Error fetching stream URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
