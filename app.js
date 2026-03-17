async function loadTrending() {
  try {
    let res = await fetch("https://melolo-api-azure.vercel.app/api/melolo/trending");
    let json = await res.json();

    console.log(json); // DEBUG

    let data = json.data || json.result || [];

    render(data);
  } catch (e) {
    document.getElementById("list").innerHTML = "API ERROR";
  }
}

function render(data) {
  let html = "";

  data.forEach(item => {
    let title = item.title || item.name || "No Title";
    let cover = item.cover || item.thumbnail || item.pic || "https://via.placeholder.com/150";

    html += `
      <div class="card" onclick="openDetail('${item.book_id}')">
        <img src="${cover}" onerror="this.src='https://via.placeholder.com/150'">
        <div class="title">${title}</div>
      </div>
    `;
  });

  document.getElementById("list").innerHTML = html;
}

function openDetail(id) {
  window.location.href = "detail.html?id=" + id;
}

async function search(q) {
  if (q.length < 2) return loadTrending();

  let res = await fetch(`https://melolo-api-azure.vercel.app/api/melolo/search?query=${q}&limit=10&offset=0`);
  let json = await res.json();

  render(json.data || []);
}

loadTrending();
