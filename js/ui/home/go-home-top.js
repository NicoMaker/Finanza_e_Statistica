// Logo e tasto «Home» nell'header: unici modi per tornare all'inizio della home,
// da qualsiasi punto (gli altri ritorni riprendono dove eri entrato)
function goHomeTop() {
  if (atHome) {
    scrollTo({ top: 0, behavior: "smooth" });
    homeY = 0;
    return;
  }
  toHome(true);
  // Se la scheda era stata aperta con pushState, rimuove quella voce di cronologia
  // (atHome è già true, quindi il popstate non fa nulla)
  if (history.state && history.state.in) {
    try {
      history.back();
    } catch (e) {}
  }
}
