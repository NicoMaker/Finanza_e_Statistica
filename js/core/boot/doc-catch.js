DATA_READY.then(() =>
  BOOT_SCRIPTS.reduce(
    (p, src) => p.then(() => bootLoad(src)),
    Promise.resolve(),
  ),
).catch((e) => {
  console.error(e);
  const box = document.createElement("p");
  box.style.cssText =
    "margin:2rem auto;max-width:34rem;padding:1rem;font:15px system-ui;color:#b91c1c";
  box.textContent =
    "Impossibile caricare i dati (" +
    e.message +
    "). Apri il sito da un server (es. Live Server o GitHub Pages), non direttamente come file.";
  (document.querySelector(".w") || document.body).prepend(box);
});
