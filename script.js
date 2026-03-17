let allData = [];

// ✅ FETCH API (SUDAH SESUAI MELOLO + CORS FIX)
async function fetchAPI(url) {
    try {
        let proxy = "https://api.allorigins.win/raw?url=" + encodeURIComponent(url);

        let res = await fetch(proxy);
        let data = await res.json();

        console.log("API:", data);

        return data.data || []; // 🔥 FIX UTAMA
    } catch (e) {
        console.log("ERROR:", e);
        return [];
    }
}

// ✅ RENDER
function render(id, data) {
    let container = document.getElementById(id);
    container.innerHTML = "";

    if (!data.length) {
        container.innerHTML = "<p>Data kosong</p>";
        return;
    }

    data.forEach(item => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${item.thumbnail}">
            <p>${item.title}</p>
        `;

        div.onclick = () => {
            localStorage.setItem("video", item.url);
            window.location = "player.html";
        };

        container.appendChild(div);
    });
}

// 🔎 SEARCH
function search(q) {
    let res = allData.filter(x =>
        (x.title || "").toLowerCase().includes(q.toLowerCase())
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
