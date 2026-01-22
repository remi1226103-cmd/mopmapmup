console.log("📝 write.js 로드됨");

// =====================
// seed 파싱
// =====================
const params = new URLSearchParams(location.search);
const seed = params.get("seed");

// =====================
// seed 표시
// =====================
window.addEventListener("DOMContentLoaded", () => {
  const seedBox = document.getElementById("seed");
  if (seed && seedBox) {
    seedBox.innerText = seed.split("|").join("\n");
  }
  render();
});

// =====================
// 저장
// =====================
function save() {
  const storyBox = document.getElementById("story");
  if (!storyBox) return;

  const story = storyBox.value.trim();
  if (!story) {
    alert("내용을 입력해 주세요.");
    return;
  }

  const data = JSON.parse(localStorage.getItem("lib") || "[]");
  data.unshift({
    seed,
    story,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("lib", JSON.stringify(data));
  storyBox.value = "";
  render();
}

// =====================
// 삭제
// =====================
function remove(index) {
  const data = JSON.parse(localStorage.getItem("lib") || "[]");
  data.splice(index, 1);
  localStorage.setItem("lib", JSON.stringify(data));
  render();
}

// =====================
// 렌더링
// =====================
function render() {
  const box = document.getElementById("archive");
  if (!box) return;

  const data = JSON.parse(localStorage.getItem("lib") || "[]");
  box.innerHTML = "";

  data.forEach((d, i) => {
    box.innerHTML += `
      <pre>${d.seed ? d.seed.split("|").join("\n") : ""}</pre>
      <p>${d.story}</p>
      <small>${d.date}</small><br>
      <button onclick="remove(${i})">삭제</button>
      <hr>
    `;
  });
}

// =====================
// 뒤로 가기
// =====================
function goBack() {
  location.href = "index.html";
}
