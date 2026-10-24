// Caso «Ipergeometrica»
T.prb.casi.ip = function (v) {
  const tp = v.tp;
  const N = Math.round(v.hN),
    K_ = Math.round(v.hK),
    n = Math.round(v.hn),
    k = Math.round(v.hk);
  if (!(N >= 1 && N <= 5000) || !(K_ >= 0 && K_ <= N) || !(n >= 0 && n <= N))
    return ER("Servono N tra 1 e 5.000, 0 ≤ K ≤ N e 0 ≤ n ≤ N.");
  if (!(k >= 0 && k <= Math.min(n, K_)))
    return ER(
      "Il numero di buoni estratti k deve essere tra 0 e il minimo di n e K.",
    );
  const lo = Math.max(0, n - (N - K_)),
    hi = Math.min(n, K_),
    xs = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
    ps = xs.map((j) => hypP(N, K_, n, j)),
    W = prFinestra(xs, ps),
    fav = hypNum(N, K_, n, k),
    tot = bComb(N, n),
    p = K_ / N,
    eqk = hypPmf(N, K_, n, k),
    le = sumPmf((j) => hypP(N, K_, n, j), lo, k),
    ge = sumPmf((j) => hypP(N, K_, n, j), k, hi);
  return (
    ks([
      K(`P(X = ${k})`, fpct(eqk), 1),
      K(`P(X ≤ ${k})`, fpct(le)),
      K(`P(X ≥ ${k})`, fpct(ge)),
      K("Casi favorevoli", bFmt(fav)),
      K("Casi possibili C(N,n)", bFmt(tot)),
      K("Media n·K/N", f4(n * p)),
      K("Se fosse con reinserimento (binomiale)", fpct(binPmf(n, k, p))),
    ]) +
    prBarre("Distribuzione ipergeometrica", W.xs, W.ps, "k =") +
    (W.tagliato ? "" : prTab("k", W.xs, W.ps))
  );
};
