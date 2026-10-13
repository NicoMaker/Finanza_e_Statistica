(function () {
  try {
    var saved = localStorage.getItem("theme");
    var dark = saved
      ? saved === "dark"
      : matchMedia("(prefers-color-scheme:dark)").matches;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0a1020" : "#0f1f4d");
  } catch (e) {}
})();

// Intro: parte a ogni ingresso nel sito (URL, refresh, rientro da un'altra pagina).
// Spostarsi tra le sezioni NON ricarica la pagina (pushState), quindi non riparte.
document.documentElement.classList.add("intro-on");
// Rientro con "indietro" da un'altra pagina (cache del browser): ricarica -> intro
addEventListener("pageshow", function (e) {
  if (e.persisted) location.reload();
});
