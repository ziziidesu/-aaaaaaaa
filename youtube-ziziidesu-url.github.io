<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Stream URL Converter</title>
</head>
<body>
    <h1>YouTube Stream URL Converter</h1>
    <form id="urlForm">
        <label for="url">YouTube URL:</label>
        <input type="text" id="url" name="url" required>
        <button type="submit">Convert</button>
    </form>
    <p id="result" style="color: green;"></p>
    <p id="error" style="color: red;"></p>

    <script>
        document.getElementById('urlForm').addEventListener('submit', async function (event) {
            event.preventDefault();
            const urlInput = document.getElementById('url').value;
            const resultElement = document.getElementById('result');
            const errorElement = document.getElementById('error');

            // 結果メッセージをリセット
            resultElement.textContent = '';
            errorElement.textContent = '';

            try {
                const url = new URL(urlInput);

                // YouTube URLかどうかを確認
                if (url.hostname !== 'www.youtube.com' && url.hostname !== 'youtube.com' && url.hostname !== 'youtu.be') {
                    throw new Error('This is not a valid YouTube URL.');
                }

                // 動画IDを取得
                let videoId = '';
                if (url.hostname === 'youtu.be') {
                    videoId = url.pathname.slice(1); // youtu.be/VIDEO_ID の形式
                } else if (url.searchParams.has('v')) {
                    videoId = url.searchParams.get('v'); // youtube.com/watch?v=VIDEO_ID の形式
                } else {
                    throw new Error('No video ID found in the URL.');
                }

                // APIリクエストを送信
                const apiUrl = `https://watawatawata.glitch.me/api/${videoId}?token=wakameoishi`;
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch the stream URL.');
                }

                const data = await response.json();

                // stream_urlが存在するか確認して表示
                if (data.stream_url) {
                    resultElement.textContent = `Stream URL: ${data.stream_url}`;
                } else {
                    throw new Error('Stream URL not found in the response.');
                }
            } catch (error) {
                errorElement.textContent = error.message;
            }
        });
    </script>
</body>
</html>
