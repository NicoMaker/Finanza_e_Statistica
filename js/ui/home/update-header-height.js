// Aggiorna l'altezza reale dell'header sticky in una variabile CSS
function updateHeaderHeight() {
  const h = document.getElementById("stk");
  if (!h) return;
  // offsetHeight include padding + border, ma esclude i margini
  // Aggiungiamo il padding-top dell'header (safe-area) e togliamo il margin-top negativo
  const rect = h.getBoundingClientRect();
  document.documentElement.style.setProperty("--h-hdr", rect.height + "px");
  // altezza della barra scheda (serve a tenere ferma la scheda di configurazione su PC)
  const n = document.getElementById("navw");
  document.documentElement.style.setProperty(
    "--h-nav",
    (n && n.offsetHeight ? n.offsetHeight + 4 : 0) + "px",
  );
}
