import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 3000;

// 静的ファイルを提供する
app.use(express.static('public'));

// 動画ページ用のルート
app.get('/video/:videoId', async (req, res) => {
    const videoId = req.params.videoId;
    const apiUrl = `https://watawatawata.glitch.me/api/${videoId}?token=wakameoishi`; // まずはメインのAPI

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
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
                        <h1>Streaming Video</h1>
                        <video controls width="640" height="360">
                            <source src="${data.stream_url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </body>
                    </html>
                `);
            } else {
                throw new Error('Stream URL not found');
            }
        } else {
            throw new Error('Failed to fetch stream URL');
        }
    } catch (error) {
        // メインAPIが失敗した場合のバックアップAPI
        const backupApiUrl = `https://huhuhuhuhuhuwatadedenk.easterndns.com/api/${videoId}?token=wakameoishi`;

        try {
            const backupResponse = await fetch(backupApiUrl);
            if (backupResponse.ok) {
                const backupData = await backupResponse.json();
                if (backupData.stream_url) {
                    res.send(`
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Stream Video</title>
                        </head>
                        <body>
                            <h1>Streaming Video</h1>
                            <video controls width="640" height="360">
                                <source src="${backupData.stream_url}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </body>
                        </html>
                    `);
                } else {
                    res.status(404).send('Stream URL not found.');
                }
            } else {
                res.status(500).send('Failed to fetch backup stream URL.');
            }
        } catch (backupError) {
            res.status(500).send('Both APIs failed.');
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
