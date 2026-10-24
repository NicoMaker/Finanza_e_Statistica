// Caso «Poisson»
T.prb.casi.po = function (v) {
  const tp = v.tp;
  const l = v.lam,
    k = Math.round(v.pk);
  if (!(l >= 0 && l <= 5000)) return ER("λ deve essere tra 0 e 5.000.");
  if (!(k >= 0 && k <= 100000))
    return ER("k deve essere un intero tra 0 e 100.000.");
  const f = (j) => poiPmf(l, j),
    eq_ = f(k),
    le = sumPmf(f, 0, k),
    sd = Math.sqrt(l),
    lo = Math.max(0, Math.floor(l - 5 * sd - 2)),
    hi = Math.ceil(l + 5 * sd + 4),
    xs = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
    W = prFinestra(xs, xs.map(f));
  return (
    ks([
      K(`P(X = ${k})`, fpct(eq_), 1),
      K(`P(X ≤ ${k})`, fpct(le)),
      K(`P(X ≥ ${k})`, fpct(Math.max(0, 1 - le + eq_))),
      K("P(nessun evento) = e^(−λ)", fpct(Math.exp(-l))),
      K("Media = varianza = λ", f4(l)),
    ]) + prBarre("Distribuzione di Poisson", W.xs, W.ps, "k =")
  );
};
