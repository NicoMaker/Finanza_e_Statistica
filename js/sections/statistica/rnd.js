// Sezione «Rendimenti e volatilità»: formule (FM.rnd) e calcolatore (T.rnd)
FM.rnd = eq(
  `<b>Rendimento</b><i>r</i><sub>k</sub> = ${fr("<i>P</i><sub>k</sub>", "<i>P</i><sub>k−1</sub>")} − 1`,
  `<b>CAGR</b>(<i>P</i><sub>n</sub> / <i>P</i><sub>0</sub>)<sup>f/n</sup> − 1 &nbsp;(<i>f</i> periodi all’anno)`,
  `<b>Volatilità annua</b><i>σ</i><sub>a</sub> = <i>σ</i>·√<i>f</i> , &nbsp;<b>VaR</b> = <i>z</i>·<i>σ</i> − <i>μ</i>`,
  `<b>Drawdown</b><i>DD</i><sub>k</sub> = ${fr("<i>P</i><sub>k</sub>", "max<sub>j≤k</sub> <i>P</i><sub>j</sub>")} − 1`,
);
T.rnd = {
  n: "Rendimenti e volatilità",
  s: "μ",
  fm: FM.rnd,
  f: [
    {
      k: "pr",
      l: "Prezzi (separati da ; o a capo)",
      t: "a",
      v: "100; 102; 101; 105; 107; 104; 110; 112",
    },
    {
      k: "fr",
      l: "Periodicità dei prezzi",
      t: "s",
      o: [
        [252, "Giornaliera (252 / anno)"],
        [52, "Settimanale (52 / anno)"],
        [12, "Mensile (12 / anno)"],
        [4, "Trimestrale (4 / anno)"],
        [1, "Annuale (1 / anno)"],
      ],
      v: 12,
    },
    { k: "rf", l: "Tasso privo di rischio annuo (%)", v: 2 },
    {
      k: "z",
      l: "Confidenza del VaR",
      t: "s",
      o: [
        [1.645, "95%"],
        [2.326, "99%"],
      ],
      v: 1.645,
    },
  ],
  c(v) {
    const P = nums(v.pr),
      n = P.length,
      f = +v.fr,
      z = +v.z;
    if (n < 3 || P.some((x) => !(x > 0)))
      return ER("Inserisci almeno 3 prezzi positivi.");
    const r = P.slice(1).map((p, k) => p / P[k] - 1),
      m = r.reduce((a, b) => a + b, 0) / r.length,
      sd = Math.sqrt(r.reduce((a, b) => a + (b - m) ** 2, 0) / (r.length - 1)),
      cagr = (P[n - 1] / P[0]) ** (f / (n - 1)) - 1,
      va = sd * Math.sqrt(f);
    let mx = 0;
    const rmx = P.map((p) => (mx = Math.max(mx, p))),
      dd = P.map((p, k) => (p / rmx[k] - 1) * 100),
      xs = P.map((_, k) => k);
    return (
      ks([
        K("Rendimento totale", f2((P[n - 1] / P[0] - 1) * 100) + "%"),
        K("Rendimento annuo composto (CAGR)", f2(cagr * 100) + "%", 1),
        K("Rendimento medio periodale", f4(m * 100) + "%"),
        K("Volatilità periodale", f4(sd * 100) + "%"),
        K("Volatilità annua", f2(va * 100) + "%"),
        K("Indice di Sharpe", va > 0 ? f4((m * f - v.rf / 100) / va) : "—"),
        K("Massimo drawdown", f2(Math.min(...dd)) + "%"),
        K("VaR parametrico (per periodo)", f2((z * sd - m) * 100) + "%"),
      ]) +
      plot({
        t: "Andamento dei prezzi",
        xs,
        lines: [
          { n: "Prezzo", c: PAL[0], a: 1, v: P },
          { n: "Massimo storico", c: PAL[1], d: "5 4", v: rmx },
        ],
        lb: xs.map((k) => "Periodo " + k),
      }) +
      plot({
        t: "Rendimenti periodali (%)",
        xs: r.map((_, k) => k + 1),
        bars: [{ n: "Rendimento", c: PAL[2], v: r.map((x) => x * 100) }],
        yf: (q) => f2(q) + "%",
        lb: r.map((_, k) => "Periodo " + (k + 1)),
      }) +
      plot({
        t: "Drawdown (%)",
        xs,
        zero: 1,
        lines: [{ n: "Drawdown", c: PAL[3], a: 1, v: dd }],
        yf: (q) => f2(q) + "%",
        lb: xs.map((k) => "Periodo " + k),
      })
    );
  },
};
