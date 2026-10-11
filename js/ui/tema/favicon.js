// Favicon che cambia col tema: stesse immagini del logo in header (link in data/config.json).
// Si aggiorna da solo quando cambia html[data-theme].
(function () {

  // Σ di riserva, usata solo se l'immagine remota non si carica
  var FALLBACK =
    "data:image/svg+xml," +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#0f1f4d'/><text x='32' y='45' font-size='38' text-anchor='middle' fill='#fff' font-family='serif' font-weight='bold'>\u03A3</text></svg>",
    );

  function apply() {
    var dark = document.documentElement.dataset.theme === "dark";
    var href = dark ? CFG.loghi.scuro : CFG.loghi.chiaro;
    var link = document.getElementById("favicon");
    if (!link) {
      link = document.createElement("link");
      link.id = "favicon";
      link.rel = "icon";
      document.head.appendChild(link);
    }
    if (link.dataset.src === href) return;
    link.dataset.src = href;
    link.type = "image/jpeg";
    link.onerror = function () {
      link.onerror = null;
      link.type = "image/svg+xml";
      link.href = FALLBACK;
    };
    link.href = href;
  }

  // il config arriva da data/config.json: parte appena è pronto
  DATA_READY.then(function () {
    apply();
    new MutationObserver(apply).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }).catch(function () {});
})();
