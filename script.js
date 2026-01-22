console.log("🔥 script.js 로드됨");

// =====================
// GitHub Pages 경로 설정
// =====================
const BASE = "/mopmapmup/"; // ← 레포 이름과 반드시 일치해야 함

// 데이터 배열
let character = [];
let place = [];
let situation = [];
let emotion = [];

// =====================
// txt 파일 로드
// =====================
async function load(file) {
  try {
    const r = await fetch(BASE + file);
    if (!r.ok) throw new Error("404");

    const text = await r.text();
    return text
      .split("\n")
      .map(v => v.trim())
      .filter(Boolean);

  } catch (err) {
    console.error("로드 실패:", BASE + file, err);
    return [];
  }
}

// =====================
// 데이터 로딩
// =====================
window.addEventListener("DOMContentLoaded", async () => {
  [character, place, situation, emotion] = await Promise.all([
    load("data/character.txt"),
    load("data/place.txt"),
    load("data/situation.txt"),
    load("data/emotion.txt")
  ]);

  console.log("✅ 로드 완료", {
    character,
    place,
    situation,
    emotion
  });

  render();
});

// =====================
// 랜덤 선택
// =====================
function pick(arr) {
  return arr.length
    ? arr[Math.floor(Math.random() * arr.length)]
    : "(소재 없음)";
}

// =====================
// 랜덤 생성
// (장소 → 감정 → 캐릭터 → 상황)
// =====================
function generate() {
  if (!character.length) {
    alert("데이터 로딩 중입니다. 잠시 후 다시 눌러주세요.");
    return;
  }

  const text = [
    pick(place),
    pick(emotion),
    pick(character),
    pick(situation)
  ].join("\n");

  document.getElementById("result").innerText = text;
}

// =====================
// 기록 페이지 이동
// =====================
function goWrite() {
  const result = document.getElementById("result").innerText;
  if (!result.trim()) {
    alert("먼저 소재를 생성해 주세요.");
    return;
  }

  const seed = result.replace(/\n/g, "|");
  location.href = `library.html?seed=${encodeURIComponent(seed)}`;
}

// =====================
// 기록 페이지 로직
// =====================
const params = new URLSearchParams(location.search);
const seed = params.get("seed");

if (seed && document.getElementById("seed")) {
  document.getElementById("seed").innerText =
    seed.split("|").join("\n");
}

// =====================
// 저장
// =====================
function save() {
  const storyBox = document.getElementById("story");
  if (!storyBox) return;

  const story = storyBox.value.trim();
  if (!story) return;

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
// 렌더링
// =====================
function render() {
  const box = document.getElementById("archive");
  if (!box) return;

  const data = JSON.parse(localStorage.getItem("lib") || "[]");
  box.innerHTML = "";

  data.forEach(d => {
    box.innerHTML += `
      <pre>${d.seed ? d.seed.split("|").join("\n") : ""}</pre>
      <p>${d.story}</p>
      <small>${d.date}</small>
      <hr>
    `;
  });
}
