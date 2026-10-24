// Lo scroll lo gestiamo noi (homeY): senza questo il browser, tornando indietro
// nella cronologia, rimette la pagina in cima e annulla la posizione salvata
try {
  history.scrollRestoration = "manual";
} catch (e) {}
