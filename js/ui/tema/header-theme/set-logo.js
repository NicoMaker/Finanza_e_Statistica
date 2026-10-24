function setLogo() {
  const lg = document.getElementById("logo");
  if (!lg) return;
  const src = isDark() ? CFG.loghi.scuro : CFG.loghi.chiaro;
  if (lg.dataset.src !== src) {
    lg.dataset.src = src;
    lg.innerHTML = `<img src="${src}" alt="Logo" />`;
  }
}
