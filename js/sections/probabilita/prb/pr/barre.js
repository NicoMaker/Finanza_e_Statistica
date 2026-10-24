// Grafico a barre di una distribuzione (percentuali)
function prBarre(titolo, xs, ps, nomeX) {
  const lb = xs.map((x) => nomeX + " " + fg(x));
  return plot({
    t: titolo,
    xs,
    bars: [{ n: "Probabilità", c: PAL[0], v: ps.map((p) => p * 100) }],
    yf: (q) => f2(q) + "%",
    lb,
  });
}
