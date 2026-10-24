// Caso «Binomiale»
T.prb.casi.bi = function (v) {
  const tp = v.tp;
  const n = Math.round(v.bn),
    k = Math.round(v.bk);
  if (!(n >= 1 && n <= 5000))
    return ER("Il numero di prove n deve essere tra 1 e 5.000.");
  if (!prOk(v.p)) return ER("p deve essere tra 0% e 100%.");
  if (!(k >= 0 && k <= n))
    return ER("Il numero di successi k deve essere tra 0 e n.");
  const p = prP(v.p),
    f = (j) => binPmf(n, j, p),
    eq_ = f(k),
    le = sumPmf(f, 0, k),
    ge = sumPmf(f, k, n),
    mu = n * p,
    sd = Math.sqrt(n * p * (1 - p)),
    all = Array.from({ length: n + 1 }, (_, i) => i),
    W = prFinestra(all, all.map(f));
  return (
    ks([
      K(`P(X = ${k})`, fpct(eq_), 1),
      K(`P(X ≤ ${k})`, fpct(le)),
      K(`P(X &lt; ${k})`, fpct(Math.max(0, le - eq_))),
      K(`P(X ≥ ${k})`, fpct(ge)),
      K(`P(X &gt; ${k})`, fpct(Math.max(0, ge - eq_))),
      K("Media np", f2(mu)),
      K("Varianza np(1−p)", f4(sd * sd)),
      K("Deviazione standard", f4(sd)),
    ]) +
    `<p class="note">In ${fg(n)} prove ci sono 2<sup>n</sup> = ${bFmt(bDispRip(2, n))} sequenze di successo/insuccesso (se p = 50%, tutte equiprobabili). Quelle con esattamente ${fg(k)} successi sono C(${fg(n)},${fg(k)}) = ${bFmt(bComb(n, k))}, ciascuna con probabilità p<sup>${fg(k)}</sup>·(1−p)<sup>${fg(n - k)}</sup>.</p>` +
    prBarre("Distribuzione binomiale", W.xs, W.ps, "k =") +
    (W.tagliato
      ? `<p class="note">Il grafico mostra solo i valori con probabilità non trascurabile.</p>`
      : prTab("k", W.xs, W.ps))
  );
};
