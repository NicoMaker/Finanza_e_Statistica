function view() {
  theme();
  // Aggiunge/rimuove la classe .home sul body per attivare lo sticky
  document.body.classList.toggle("home", atHome);
  hm.style.display = atHome ? "" : "none";
  navw.style.display = atHome ? "none" : "";
  main.style.display = atHome ? "none" : "";
  hn.innerHTML = atHome
    ? "<kbd>←</kbd><kbd>→</kbd><kbd>↑</kbd><kbd>↓</kbd> muoviti · <kbd>Invio</kbd> apri · <kbd>/</kbd> o <kbd>Ctrl</kbd>+<kbd>K</kbd> cerca"
    : `<kbd>/</kbd> o <kbd>Ctrl</kbd>+<kbd>K</kbd> cerca · <kbd>↑</kbd><kbd>↓</kbd> nei campi cambiano il valore · <kbd>Invio</kbd> campo successivo · <kbd>Esc</kbd> esci dal campo, poi torna alla home`;
  // Aggiorna l'altezza dopo il rendering
  requestAnimationFrame(updateHeaderHeight);
}
