// Favicon che cambia col tema: stesse immagini del logo in header (js/ui/tema/header-theme.js).
// Si aggiorna da solo quando cambia html[data-theme].
(function () {
  var FAV_LIGHT =
    "https://www.generali.com/.imaging/mte/generali/750x682/dam/site-generali/media/images/logo/logo-verticale.jpg/jcr:content/logo-verticale.2020-07-16-17-41-03.jpg";
  var FAV_DARK =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSavFU40bVkB7fiPxCNQiXeM8LR0ADGqxMnFkikQkZje4NnrqljhUF2AH8&s=10";

  // Σ di riserva, usata solo se l'immagine remota non si carica
  var FALLBACK =
    "data:image/svg+xml," +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#0f1f4d'/><text x='32' y='45' font-size='38' text-anchor='middle' fill='#fff' font-family='serif' font-weight='bold'>\u03A3</text></svg>",
    );

  function apply() {
    var dark = document.documentElement.dataset.theme === "dark";
    var href = dark ? FAV_DARK : FAV_LIGHT;
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

  apply();
  new MutationObserver(apply).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
})();
