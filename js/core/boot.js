// Avvio: aspetta i JSON di /json e solo dopo carica, nell'ordine, gli script che li usano.
// (gli script aggiunti da qui condividono le stesse variabili globali degli altri)
const BOOT_SCRIPTS = [
  "js/math/borsa-portafoglio.js",
  "js/math/borsa-robot.js",
  "js/charts/borsa/equity-chart.js",
  "js/ui/borsalive-panels.js",
  "js/sections/borsa/borsalive.js",
  "js/core/state.js",
  "js/ui/tema/header-theme.js",
  "js/ui/build.js",
  "js/ui/form.js",
  "js/ui/country-select.js",
  "js/ui/tooltip.js",
  "js/ui/resize.js",
  "js/ui/tema/theme-toggle.js",
  "js/search/palette.js",
  "js/ui/keyboard.js",
  "js/ui/home.js",
  "js/app.js", // ultimo: avvia l'app
];

function bootLoad(src) {
  return new Promise((ok, ko) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = ok;
    s.onerror = () => ko(new Error("Script non caricato: " + src));
    document.body.appendChild(s);
  });
}

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
