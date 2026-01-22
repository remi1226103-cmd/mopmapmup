// 데이터 배열 (명확하게 초기화)
let c = [];
let p = [];
let s = [];
let e = [];

// txt 파일 로드 함수 (단 하나만 존재)
async function load(file) {
  try {
    const r = await fetch(file);

    if (!r.ok) {
      console.error("파일을 불러올 수 없음:", file);
      return [];
    }

    const text = await r.text();
    return text
      .split("\n")
      .map(v => v.trim())
      .filter(v => v.length > 0);

  } catch (err) {
    console.error("fetch 에러:", file, err);
    return [];
  }
}

// 페이지 로드시 데이터 먼저 불러오기
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const result = await Promise.all([
      load("data/place.txt"),
      load("data/emotion.txt"),
      load("data/character.txt"),
      load("data/situation.txt")      
    ]);

    // 순서 정확히 매칭
    c = result[0];
    p = result[1];
    s = result[2];
    e = result[3];

    console.log("로드 완료:", { c, p, s, e });

  } catch (err) {
    console.error("데이터 로드 실패:", err);
  }
});

// 안전한 랜덤 선택
function pick(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return "(소재 없음)";
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

// 랜덤 생성
function generate() {
  // 아직 로딩 안 됐을 경우 방지
  if (!c.length || !p.length || !s.length || !e.length) {
    alert("데이터를 불러오는 중입니다. 잠시 후 다시 눌러주세요.");
    return;
  }

  const text = [
    pick(c),
    pick(p),
    pick(s),
    pick(e)
  ].join("\n");

  document.getElementById("result").innerText = text;
}

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>기록하기</title>
</head>
<body>

<h2>선택된 소재</h2>
<pre id="seed"></pre>

<h2>이야기 기록</h2>
<textarea id="story" rows="10" cols="50"
  placeholder="여기에 이야기를 써 주세요"></textarea>
<br>
<button onclick="save()">저장</button>

<hr>

<h2>저장된 기록</h2>
<div id="archive"></div>

<script src="script.js"></script>
</body>
</html>

