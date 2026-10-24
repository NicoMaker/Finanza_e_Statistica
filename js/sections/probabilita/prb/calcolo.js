// Calcola il risultato: sceglie il caso in base a v.tp
T.prb.c = function (v) {
  const caso = T.prb.casi[v.tp];
  const html = caso ? caso(v) : undefined;
  return html === undefined ? ER("Controlla i dati inseriti.") : html;
};
