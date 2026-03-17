let url = localStorage.getItem("video");
let video = document.getElementById("video");

if (url.includes(".m3u8")) {
    if (Hls.isSupported()) {
        let hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
    }
} else {
    video.src = url;
}