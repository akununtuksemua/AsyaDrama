let allData = [];

// 🔥 FETCH FIX CORS + FLEXIBLE
async function fetchAPI(url) {
    try {
        let proxy = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

        let res = await fetch(proxy);
        let text = await res.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch {
            console.log("NOT JSON:", text);
            return [];
        }

        console.log("API:", data);

        return data.result || data.data || data;
    } catch (e) {
        console.log("FETCH ERROR:", e);
        return [];
    }
}

// 🔥 AMBIL FIELD OTOMATIS (ANTI ERROR)
function getImage(item) {
    return item.thumbnail || item.image || item.cover || "";
}

function getVideo(item) {
    return item.video || item.url || item.link || "";
}

function getTitle(item) {
    return item.title || item.name || "No Title";
}

// 🎬 RENDER
function render(id, data) {
    let container = document.getElementById(id);
    container.innerHTML = "";

    if (!data || data.length === 0) {
        container.innerHTML = "<p>Data kosong</p>";
        return;
    }

    data.forEach(item => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${getImage(item)}">
            <p>${getTitle(item)}</p>
        `;

        div.onclick = () => {
            localStorage.setItem("video", getVideo(item));
            window.location = "player.html";
        };

        container.appendChild(div);
    });
}

// 🔍 SEARCH
function search(q) {
    let res = allData.filter(x =>
        getTitle(x).toLowerCase().includes(q.toLowerCase())
    );
    render("search", res);
}

// 🚀 LOAD DATA
async function load() {
    let trending = await fetchAPI("https://melolo-api-azure.vercel.app/api/melolo/trending");
    let latest = await fetchAPI("https://melolo-api-azure.vercel.app/api/melolo/latest");

    console.log("TRENDING:", trending);
    console.log("LATEST:", latest);

    if (!trending.length && !latest.length) {
        document.body.innerHTML += "<h2 style='color:red'>API ERROR / CORS BLOCKED</h2>";
        return;
    }

    allData = [...trending, ...latest];

    render("trending", trending);
    render("latest", latest);
}

load();
