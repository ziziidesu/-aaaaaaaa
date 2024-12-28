import express from 'express';  // ESモジュールのインポート
import fetch from 'node-fetch';  // もし node-fetch を使う場合、これも import で指定

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
   
