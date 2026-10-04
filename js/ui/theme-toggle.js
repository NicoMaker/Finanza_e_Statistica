// Pulsante tema chiaro/scuro
tg.onclick = () => {
  const r = document.documentElement,
    d = r.dataset.theme
      ? r.dataset.theme == "dark"
      : matchMedia("(prefers-color-scheme:dark)").matches;
  r.dataset.theme = d ? "light" : "dark";
};
