// Colora l'intestazione in base alla scheda aperta
function theme() {
  const w = document.querySelector(".w"),
    lg = w.querySelector(".logo"),
    h = w.querySelector("header h1"),
    pp = w.querySelector("header p");
  if (atHome) {
    ["--ac", "--gold", "--ac2"].forEach((q) => w.style.removeProperty(q));
    lg.textContent = HD.e;
    h.textContent = HD.t;
    pp.textContent = HD.d;
    return;
  }
  const t = TH[cur];
  w.style.setProperty("--ac", t[1]);
  w.style.setProperty("--gold", t[1]);
  w.style.setProperty("--ac2", "color-mix(in srgb," + t[1] + " 42%,#07101f)");
  lg.textContent = t[0];
  h.textContent = T[cur].n;
  pp.textContent = t[2];
}
