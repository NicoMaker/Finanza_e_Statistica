// Descrizione di un tipo di raggruppamento per i dati P (n, k, parola, scelte, etichette)
function comDesc(id, P) {
  const d = comDesc0(id, P);
  if (d)
    d.len =
      { ds: P.k, dr: P.k, cs: P.k, cr: P.k, pm: (P.sz || []).length }[id] ??
      (id == "pr" ? P.w.cnt.reduce((a, b) => a + b, 0) : P.n);
  return d;
}
