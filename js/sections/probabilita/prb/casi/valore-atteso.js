// Caso «Valore atteso»
T.prb.casi.va = function (v) {
  const tp = v.tp;
  const X = nums(v.xv),
    Pp = prList(v.xp);
  if (X.length < 2 || X.length != Pp.length)
    return ER("Inserisci almeno due valori e lo stesso numero di probabilità.");
  if (Pp.some((x) => x < 0 || x > 1))
    return ER("Le probabilità devono essere tra 0% e 100%.");
  const sm = Pp.reduce((a, b) => a + b, 0);
  if (Math.abs(sm - 1) > 1e-6)
    return ER(`Le probabilità devono sommare 100% (ora ${f2(sm * 100)}%).`);
  const E = X.reduce((s, x, i) => s + x * Pp[i], 0),
    E2 = X.reduce((s, x, i) => s + x * x * Pp[i], 0),
    vr = Math.max(0, E2 - E * E),
    ord = X.map((x, i) => [x, Pp[i]]).sort((a, b) => a[0] - b[0]);
  return (
    ks([
      K("Valore atteso E[X]", f4(E), 1),
      K("E[X²]", f4(E2)),
      K("Varianza", f4(vr)),
      K("Deviazione standard", f4(Math.sqrt(vr))),
      K(
        "Probabilità di perdita P(X &lt; 0)",
        fpct(X.reduce((s, x, i) => s + (x < 0 ? Pp[i] : 0), 0)),
      ),
    ]) +
    prBarre(
      "Distribuzione di X",
      ord.map((o) => o[0]),
      ord.map((o) => o[1]),
      "X =",
    ) +
    prTab(
      "x",
      ord.map((o) => o[0]),
      ord.map((o) => o[1]),
    )
  );
};
