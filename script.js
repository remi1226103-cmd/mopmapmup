console.log("🔥 script.js 로드됨");

// =====================
// GitHub Pages 경로
// =====================
const BASE = "/mopmapmup/";

// =====================
// 데이터 배열
// =====================
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

  console.log("✅ 데이터 로드 완료", {
    character,
    place,
    situation,
    emotion
  });
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
    alert("데이터를 불러오는 중입니다. 잠시 후 다시 눌러주세요.");
    return;
  }

  const text = [
    pick(place),
    pick(emotion),
    pick(character),
    pick(situation)
  ].join("\n");

  const resultBox = document.getElementById("result");
  resultBox.innerText = text;
  resultBox.classList.remove("hidden"); // 🔥 여기
}


// =====================
// 기록 페이지로 이동
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

