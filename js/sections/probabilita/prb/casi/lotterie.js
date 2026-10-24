// Caso «Lotterie»
T.prb.casi.lo = function (v) {
  const tp = v.tp;
  const N = Math.round(v.lN),
    m = Math.round(v.lm),
    g = Math.round(v.lg);
  if (!(N >= 1 && N <= 200) || !(m >= 1 && m <= N) || !(g >= 1 && g <= N))
    return ER("Servono N tra 1 e 200, e numeri estratti e giocati tra 1 e N.");
  const tot = bComb(N, m),
    lo = Math.max(0, g - (N - m)),
    hi = Math.min(g, m),
    xs = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
    ws = xs.map((j) => bComb(m, j) * bComb(N - m, g - j)),
    ps = ws.map((w) => bRatio(w, tot));
  return (
    ks([
      K("Combinazioni possibili C(N,estratti)", bFmt(tot), 1),
      K(`Indovinare tutti i ${fg(hi)} possibili`, fpct(ps[ps.length - 1])),
      K("In altre parole", bUnoSu(ws[ws.length - 1], tot)),
      K("Numeri indovinati in media", f4((g * m) / N)),
    ]) +
    TB(
      ["Indovinati", "Combinazioni favorevoli", "Probabilità", "1 su …"],
      xs.map((j, i) => [fg(j), bFmt(ws[i]), fpct(ps[i]), bUnoSu(ws[i], tot)]),
    ) +
    prBarre("Quanti numeri si indovinano", xs, ps, "Indovinati =") +
    `<p class="note">Con 90 numeri e 6 estratti, 6 giocati: 1 su ${bFmt(bComb(90, 6))} (SuperEnalotto, 6 punti).</p>`
  );
};
