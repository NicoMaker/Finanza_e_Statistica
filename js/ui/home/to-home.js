// toHome(): torna alla home nel punto da cui eri entrato.
// toHome(true): torna all'inizio della home (solo dal logo).
function toHome(top) {
  atHome = true;
  view();
  const c = hm.querySelector('[data-t="' + cur + '"]');
  if (c) c.focus({ preventScroll: true });
  scrollTo({ top: top ? 0 : homeY, behavior: "instant" });
  if (top) homeY = 0;
}
