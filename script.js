// APIのURL
const API_BASE_URL = "https://watawatawata.glitch.me/api/";
const TOKEN = "wakameoishi";

document.getElementById('playButton').addEventListener('click', async () => {
    const videoId = document.getElementById('videoIdInput').value;

    if (!videoId) {
        alert('Please enter a YouTube Video ID.');
        return;
    }

    try {
        // APIからストリームURLを取得
        const response = await fetch(`${API_BASE_URL}${videoId}?token=${TOKEN}`);
        const data = await response.json();

        if (data.streamUrl) {
            // 動画プレイヤーにストリームURLを設定
            const videoPlayer = document.getElementById('videoPlayer');
            videoPlayer.src = data.streamUrl;
        } else {
            alert('Stream URL not found.');
        }
    } catch (error) {
        console.error('Error fetching stream URL:', error);
        alert('Failed to fetch stream URL. Please try again.');
    }
});
