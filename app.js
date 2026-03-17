async function loadTrending() {
  let res = await fetch("https://melolo-api-azure.vercel.app/api/melolo/trending");
  let json = await res.json();
  render(json.data);
}

function render(data) {
  let html = "";
  data.forEach(item => {
    html += `
      <div class="card" onclick="openDetail('${item.book_id}')">
        <img src="${item.cover}">
        <div class="title">${item.title}</div>
      </div>
    `;
  });
  document.getElementById("list").innerHTML = html;
}

function openDetail(id) {
  location.href = "detail.html?id=" + id;
}

async function search(q) {
  if (q.length < 2) return loadTrending();

  let res = await fetch(`https://melolo-api-azure.vercel.app/api/melolo/search?query=${q}&limit=10&offset=0`);
  let json = await res.json();
  render(json.data);
}

loadTrending();