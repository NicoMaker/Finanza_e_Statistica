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
    ["--ac", "--gold", "--ac2"].forEach((q) => w.style.removeProperty(q));
    h.textContent = HD.t;
    pp.textContent = HD.d;
    return;
  }
  const t = TH[cur];
  w.style.setProperty("--ac", t[1]);
  w.style.setProperty("--gold", t[1]);
  w.style.setProperty("--ac2", "color-mix(in srgb," + t[1] + " 42%,#07101f)");
  h.textContent = T[cur].n;
  pp.textContent = t[2];
}
