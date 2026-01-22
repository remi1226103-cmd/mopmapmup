// 데이터 배열
let c = [], p = [], s = [], e = [];

// txt 파일 로드
async function load(file) {
  try {
    const r = await fetch(file);
    if (!r.ok) throw new Error("404");
    const text = await r.text();
    return text.split("\n").map(v => v.trim()).filter(Boolean);
  } catch (err) {
    console.error("로드 실패:", file);
    return [];
  }
}

// 데이터 로드
window.addEventListener("DOMContentLoaded", async () => {
  [c, p, s, e] = await Promise.all([
    load("data/character.txt"),
    load("data/place.txt"),
    load("data/situation.txt"),
    load("data/emotion.txt")
  ]);

  console.log("로드 완료", { c, p, s, e });
  render();
});

// 랜덤 선택
function pick(arr) {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : "(소재 없음)";
}

// 랜덤 생성
function generate() {
  if (!c.length) {
    alert("데이터 로딩 중입니다");
    return;
  }

  const text = [pick(c), pick(p), pick(s), pick(e)].join("\n");
  document.getElementById("result").innerText = text;
}

// 기록 페이지 이동
function goWrite() {
  const seed = document.getElementById("result").innerText.replace(/\n/g, "|");
  location.href = `library.html?seed=${encodeURIComponent(seed)}`;
}

// ===== 기록 페이지 =====

const params = new URLSearchParams(location.search);
const seed = params.get("seed");

if (seed && document.getElementById("seed")) {
  document.getElementById("seed").innerText = seed.split("|").join("\n");
}

function save() {
  const story = document.getElementById("story").value.trim();
  if (!story) return;

  const data = JSON.parse(localStorage.getItem("lib") || "[]");
  data.unshift({ seed, story, date: new Date().toLocaleString() });
  localStorage.setItem("lib", JSON.stringify(data));
  render();
}

function render() {
  const box = document.getElementById("archive");
  if (!box) return;

  const data = JSON.parse(localStorage.getItem("lib") || "[]");
  box.innerHTML = "";

  data.forEach(d => {
    box.innerHTML += `
      <pre>${d.seed.split("|").join("\n")}</pre>
      <p>${d.story}</p>
      <small>${d.date}</small>
      <hr>
    `;
  });
}
