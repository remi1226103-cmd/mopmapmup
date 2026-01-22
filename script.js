async function load(file) {
  const r = await fetch(file);
  return r.text().then(t => t.split("\n").filter(Boolean));
}

let c, s, e, p;

Promise.all([
  load("data/character.txt"),
  load("data/place.txt"),
  load("data/situation.txt"),
  load("data/emotion.txt")
]).then(d => [c, p, s, e] = d);

function pick(a) {
  return a[Math.floor(Math.random() * a.length)];
}

function generate() {
  const text = `${pick(c)}\n${pick(p)}\n${pick(s)}\n${pick(e)}`;
  document.getElementById("result").innerText = text;
}

function goWrite() {
  const seed = document.getElementById("result").innerText.replace(/\n/g, "|");
  location.href = `library.html?seed=${encodeURIComponent(seed)}`;
}

const params = new URLSearchParams(location.search);
const seed = params.get("seed");

if (seed && document.getElementById("seed")) {
  document.getElementById("seed").innerText = seed.split("|").join("\n");
}

function save() {
  const text = document.getElementById("story").value;
  if (!text.trim()) return;

  const data = JSON.parse(localStorage.getItem("lib") || "[]");
  data.unshift({ seed, text, date: new Date().toLocaleString() });
  localStorage.setItem("lib", JSON.stringify(data));
  render();
}

function render() {
  const box = document.getElementById("archive");
  if (!box) return;
  box.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("lib") || "[]");
  data.forEach(d => {
    box.innerHTML += `<pre>${d.seed.split("|").join("\n")}</pre><p>${d.text}</p><hr>`;
  });
}

render();


