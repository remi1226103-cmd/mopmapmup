let c = [], p = [], s = [], e = [];

// txt 파일 로드 함수 (하나만!)
async function load(file) {
  const r = await fetch(file);

  if (!r.ok) {
    console.error("파일을 불러올 수 없음:", file);
    return [];
  }

  const text = await r.text();
  return text
    .split("\n")
    .map(v => v.trim())
    .filter(Boolean);
}

// 페이지 로드시 데이터 먼저 불러오기
window.addEventListener("DOMContentLoaded", async () => {
  [c, p, s, e] = await Promise.all([
    load("data/character.txt"),
    load("data/place.txt"),
    load("data/situation.txt"),
    load("data/emotion.txt")
  ]);
});

// 안전한 랜덤 선택
function pick(arr) {
  if (!arr || arr.length === 0) return "(소재 없음)";
  return arr[Math.floor(Math.random() * arr.length)];
}

// 랜덤 생성
function generate() {
  const text = [
    pick(c),
    pick(p),
    pick(s),
    pick(e)
  ].join("\n");

  document.getElementById("result").innerText = text;
}
