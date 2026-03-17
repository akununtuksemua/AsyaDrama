// ===================== CONFIG =====================
const DETAIL_API = "https://melolo-api-azure.vercel.app/api/melolo/detail?id=7497915082546875408";
const PLAY_API = "https://melolo-api-azure.vercel.app/api/melolo/play?vid=";
const SEARCH_API = "https://melolo-api-azure.vercel.app/api/melolo/search?q=";

// ===================== ELEMENT =====================
const video = document.getElementById("video");
const episodesDiv = document.getElementById("episodes");
const title = document.getElementById("title");
const search = document.getElementById("search");

let currentEpisodes = [];
let currentIndex = 0;

// ===================== LOAD DETAIL =====================
async function loadDetail(url = DETAIL_API) {
    const res = await fetch(url);
    const json = await res.json();

    const data = json.data.video_data;

    title.innerText = data.series_title;

    currentEpisodes = data.video_list;

    renderEpisodes();

    if (currentEpisodes.length > 0) {
        loadVideoByIndex(0);
    }
}

// ===================== RENDER EPISODES =====================
function renderEpisodes() {
    episodesDiv.innerHTML = "";

    currentEpisodes.forEach((ep, index) => {
        const div = document.createElement("div");
        div.className = "ep";

        div.innerHTML = `
            <img src="${ep.cover}">
            <span>Ep ${ep.vid_index}</span>
        `;

        div.onclick = () => loadVideoByIndex(index);

        episodesDiv.appendChild(div);
    });
}

// ===================== LOAD VIDEO =====================
function loadVideoByIndex(index) {
    currentIndex = index;

    const vid = currentEpisodes[index].vid;

    localStorage.setItem("lastEpisode", index);

    loadVideo(vid);
}

async function loadVideo(vid) {
    const res = await fetch(PLAY_API + vid);
    const json = await res.json();

    const url = json.data.main_url;

    playVideo(url);
}

// ===================== PLAY VIDEO =====================
function playVideo(url) {
    if (url.includes(".m3u8")) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
        } else {
            video.src = url;
        }
    } else {
        video.src = url;
    }

    video.play();

    // AUTO NEXT
    video.onended = () => {
        if (currentIndex < currentEpisodes.length - 1) {
            loadVideoByIndex(currentIndex + 1);
        }
    };
}

// ===================== BOOKMARK =====================
function loadLastEpisode() {
    const last = localStorage.getItem("lastEpisode");
    if (last) {
        loadVideoByIndex(parseInt(last));
    }
}

// ===================== SEARCH =====================
search.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        const q = search.value;

        const res = await fetch(SEARCH_API + q);
        const json = await res.json();

        const list = json.data;

        episodesDiv.innerHTML = "";

        list.forEach(item => {
            const div = document.createElement("div");
            div.className = "ep";

            div.innerHTML = `
                <img src="${item.cover}">
                <span>${item.title}</span>
            `;

            div.onclick = () => loadDetail(item.detail_url);

            episodesDiv.appendChild(div);
        });
    }
});

// ===================== INIT =====================
loadDetail();
setTimeout(loadLastEpisode, 2000);