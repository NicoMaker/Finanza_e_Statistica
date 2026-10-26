// Logo chiaro/scuro + colore intestazione in base alla scheda aperta
// Link dei loghi: json/config/config.json (CFG.loghi)

const isDark = () => document.documentElement.dataset.theme === "dark";

function setLogo() {
  const lg = document.getElementById("logo");
  if (!lg) return;
  const src = isDark() ? CFG.loghi.scuro : CFG.loghi.chiaro;
  if (lg.dataset.src !== src) {
    lg.dataset.src = src;
    lg.innerHTML = `<img src="${src}" alt="Logo" />`;
  }
}

// Colora l'intestazione in base alla scheda aperta
function theme() {
  const w = document.querySelector(".w"),
    h = w.querySelector("header h1"),
    pp = w.querySelector("header p");
  setLogo();
  if (atHome) {
    ["--ac", "--gold", "--ac2", "--sec"].forEach((q) => w.style.removeProperty(q));
    h.textContent = HD.t;
    pp.textContent = HD.d;
    return;
  }
  const t = TH[cur];
  // stile banca: intestazione e colori restano sempre blu notte/oro;
  // il colore della scheda resta solo come filo sottile (--sec) sulle card
  ["--ac", "--gold", "--ac2"].forEach((q) => w.style.removeProperty(q));
  w.style.setProperty("--sec", t[1]);
  h.textContent = T[cur].n;
  pp.textContent = t[2];
}
