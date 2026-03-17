async function loadData() {
    try {
        let res = await fetch("https://api.sansekai.my.id/drama");
        let data = await res.json();

        let container = document.getElementById("list");

        data.result.forEach(item => {
            let div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
                <span class="badge">Baru</span>
                <span class="views">${randomViews()}</span>
                <img src="${item.thumbnail}">
            `;

            div.onclick = () => {
                window.open(item.video, "_blank");
            };

            container.appendChild(div);
        });

    } catch (e) {
        document.getElementById("list").innerText = "API Error";
    }
}

function randomViews() {
    return Math.floor(Math.random() * 70) + "K";
}

loadData();