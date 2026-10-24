// Caso «Normale»
T.prb.casi.no = function (v) {
  const tp = v.tp;
  const mu = v.mu,
    sg = v.sg,
    a = Math.min(v.xa, v.xb),
    b = Math.max(v.xa, v.xb);
  if (!(sg > 0))
    return ER("La deviazione standard σ deve essere maggiore di 0.");
  const za = (a - mu) / sg,
    zb = (b - mu) / sg,
    Fa = normCdf(za),
    Fb = normCdf(zb),
    xs = Array.from({ length: 81 }, (_, i) => mu + (-4 + i * 0.1) * sg);
  return (
    ks([
      K(`P(a ≤ X ≤ b)`, fpct(Fb - Fa), 1),
      K(`P(X ≤ ${fg(a)})`, fpct(Fa)),
      K(`P(X ≥ ${fg(b)})`, fpct(1 - Fb)),
      K("z di a", f4(za)),
      K("z di b", f4(zb)),
      K("Entro ±1σ / ±2σ / ±3σ", "68,27% / 95,45% / 99,73%"),
    ]) +
    plot({
      t: "Densità della normale N(μ, σ²)",
      xs,
      lines: [
        {
          n: "Densità",
          c: PAL[0],
          a: 1,
          v: xs.map((x) => normPdf((x - mu) / sg) / sg),
        },
      ],
      yf: (q) => f4(q),
      lb: xs.map((x) => "x = " + f2(x)),
    })
  );
};
