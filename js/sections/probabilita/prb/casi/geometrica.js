// Caso «Geometrica»
T.prb.casi.ge = function (v) {
  const tp = v.tp;
  const k = Math.round(v.gk);
  if (!prOk(v.p) || !(prP(v.p) > 0))
    return ER("p deve essere maggiore di 0% e al massimo 100%.");
  if (!(k >= 1 && k <= 100000))
    return ER("La prova k deve essere un intero da 1 a 100.000.");
  const p = prP(v.p),
    cdf = 1 - (1 - p) ** k,
    mx = Math.min(60, Math.max(10, Math.ceil(3 / p))),
    xs = Array.from({ length: mx }, (_, i) => i + 1);
  return (
    ks([
      K(`P(primo successo alla prova ${k})`, fpct(geoPmf(p, k)), 1),
      K(`P(successo entro ${k} prove)`, fpct(cdf)),
      K(`P(nessun successo in ${k} prove)`, fpct(1 - cdf)),
      K("Prove attese 1/p", f2(1 / p)),
      K("Varianza (1−p)/p²", f2((1 - p) / (p * p))),
    ]) +
    prBarre(
      "Distribuzione geometrica",
      xs,
      xs.map((x) => geoPmf(p, x)),
      "Prova",
    )
  );
};
