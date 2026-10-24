// Caso «Classica»
T.prb.casi.cl = function (v) {
  const tp = v.tp;
  const fa = Math.round(v.fa),
    pos = Math.round(v.pos);
  if (!(pos >= 1) || !(fa >= 0) || fa > pos)
    return ER("Servono 0 ≤ favorevoli ≤ possibili e almeno un caso possibile.");
  const p = fa / pos;
  return (
    ks([
      K("Probabilità P(A)", fpct(p), 1),
      K("Come frazione", `${fg(fa)} / ${fg(pos)}`),
      K("Come numero", f4(p)),
      K("In altre parole", prU(p)),
      K("Probabilità del contrario", fpct(1 - p)),
      K("Quote (favorevoli : sfavorevoli)", `${fg(fa)} : ${fg(pos - fa)}`),
    ]) +
    `<p class="note">Esempio: 4 assi in un mazzo di 52 carte → P(asso) = 4/52 = 1/13.</p>`
  );
};
