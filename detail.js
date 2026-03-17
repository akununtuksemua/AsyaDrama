let data = JSON.parse(localStorage.getItem("detail"));

document.getElementById("title").innerText = data.title || "No Title";

let episodes = data.episodes || [data]; // fallback kalau tidak ada episode

let container = document.getElementById("episodes");

episodes.forEach((ep, i) => {
    let btn = document.createElement("div");
    btn.className = "card";

    btn.innerHTML = `<p>Episode ${i+1}</p>`;

    btn.onclick = () => {
        localStorage.setItem("video", ep.video || ep.url);
        window.location = "player.html";
    };

    container.appendChild(btn);
});