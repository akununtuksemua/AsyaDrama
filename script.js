let allData = [];

async function fetchAPI(url) {
    let res = await fetch(url);
    let data = await res.json();
    return data.result || data.data || data;
}

function render(id, data) {
    let container = document.getElementById(id);
    container.innerHTML = "";

    data.forEach(item => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${item.thumbnail || item.image}">
        `;

        div.onclick = () => {
            localStorage.setItem("detail", JSON.stringify(item));
            window.location = "detail.html";
        };

        container.appendChild(div);
    });
}

async function load() {
    let trending = await fetchAPI("https://melolo-api-azure.vercel.app/api/melolo/trending");
    let latest = await fetchAPI("https://melolo-api-azure.vercel.app/api/melolo/latest");

    allData = [...trending, ...latest];

    render("trending", trending);
    render("latest", latest);
}

function search(q) {
    let res = allData.filter(x =>
        (x.title || "").toLowerCase().includes(q.toLowerCase())
    );
    render("search", res);
}

load();