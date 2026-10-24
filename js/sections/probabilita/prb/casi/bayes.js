// Caso «Bayes»
T.prb.casi.ba = function (v) {
  const tp = v.tp;
  const pri = prList(v.hp),
    ver = prList(v.hl),
    m = pri.length;
  if (m < 2 || ver.length != m)
    return ER(
      "Inserisci almeno due ipotesi e lo stesso numero di verosimiglianze.",
    );
  if (pri.some((x) => x < 0 || x > 1) || ver.some((x) => x < 0 || x > 1))
    return ER("Le probabilità devono essere tra 0% e 100%.");
  const sm = pri.reduce((s, x) => s + x, 0);
  if (Math.abs(sm - 1) > 1e-6)
    return ER(
      `Le probabilità a priori devono sommare 100% (ora ${f2(sm * 100)}%).`,
    );
  const r = bayes(pri, ver);
  if (!(r.pe > 0)) return ER("P(E) è zero: l’evidenza non può verificarsi.");
  return (
    ks([
      K("P(E) — probabilità totale", fpct(r.pe), 1),
      ...r.post.map((q, i) =>
        K(`P(H${i + 1}|E) a posteriori`, fpct(q), q == Math.max(...r.post)),
      ),
    ]) +
    TB(
      [
        "Ipotesi",
        "P(Hᵢ) a priori",
        "P(E|Hᵢ)",
        "P(Hᵢ)·P(E|Hᵢ)",
        "P(Hᵢ|E) a posteriori",
      ],
      pri.map((p, i) => [
        "H" + (i + 1),
        fpct(p),
        fpct(ver[i]),
        fpct(p * ver[i]),
        fpct(r.post[i]),
      ]),
    ) +
    plot({
      t: "Probabilità a priori e a posteriori (%)",
      xs: pri.map((_, i) => i + 1),
      bars: [
        { n: "A priori", c: PAL[1], v: pri.map((x) => x * 100) },
        { n: "A posteriori", c: PAL[0], v: r.post.map((x) => x * 100) },
      ],
      yf: (q) => f2(q) + "%",
      lb: pri.map((_, i) => "Ipotesi H" + (i + 1)),
    })
  );
};
