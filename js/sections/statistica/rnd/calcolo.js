// Calcolo dei risultati
T.rnd.c = function (v) {
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
      lb: xs.map((k) => "Periodo " + fg(k)),
    }) +
    plot({
      t: "Rendimenti periodali (%)",
      xs: r.map((_, k) => k + 1),
      bars: [{ n: "Rendimento", c: PAL[2], v: r.map((x) => x * 100) }],
      yf: (q) => f2(q) + "%",
      lb: r.map((_, k) => "Periodo " + fg(k + 1)),
    }) +
    plot({
      t: "Drawdown (%)",
      xs,
      zero: 1,
      lines: [{ n: "Drawdown", c: PAL[3], a: 1, v: dd }],
      yf: (q) => f2(q) + "%",
      lb: xs.map((k) => "Periodo " + fg(k)),
    })
  );
};
