// Logo chiaro/scuro + colore intestazione in base alla scheda aperta
const LOGO_LIGHT =
  "https://www.generali.com/.imaging/mte/generali/750x682/dam/site-generali/media/images/logo/logo-verticale.jpg/jcr:content/logo-verticale.2020-07-16-17-41-03.jpg";
const LOGO_DARK =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSavFU40bVkB7fiPxCNQiXeM8LR0ADGqxMnFkikQkZje4NnrqljhUF2AH8&s=10";

function isDark() {
  return document.documentElement.dataset.theme === "dark";
}

function setLogo() {
  const lg = document.getElementById("logo");
  if (!lg) return;
  const src = isDark() ? LOGO_DARK : LOGO_LIGHT;
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