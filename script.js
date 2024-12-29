function extractVideoId() {
    const url = document.getElementById("urlInput").value;
    const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:.*[?&]v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(pattern);

    if (match) {
        document.getElementById("result").textContent = "動画ID: " + match[1];
    } else {
        document.getElementById("result").textContent = "無効なYouTube URLです。";
    }
}
