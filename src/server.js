import express from 'express';
import fetch from 'node-fetch'; // ESM対応済み
const app = express();
const port = process.env.PORT || 3000;

// 静的ファイルを提供する
app.use(express.static('public'));

// 動画表示ページ
app.get('/video/:videoId', async (req, res) => {
    const videoId = req.params.videoId;
    const apiUrl = `https://watawatawata.glitch.me/api/${videoId}?token=wakameoishi`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.stream_url) {
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Stream Video</title>
                </head>
                <body>
                    <h1>Streaming Video: ${videoId}</h1>
                    <video controls width="640" height="360">
                        <source src="${data.stream_url}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </body>
                </html>
            `);
        } else {
            res.status(404).send('Stream URL not found.');
        }
    } catch (error) {
        res.status(500).send('Error fetching video data.');
    }
});

// サーバー起動
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
