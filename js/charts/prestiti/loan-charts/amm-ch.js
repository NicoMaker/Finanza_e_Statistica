// Grafici e tabelle per ammortamenti e prestiti
function ammCh(R, C, t0, ti) {
  const g = Math.ceil(R.length / 60),
    G = [];
  for (let j = 0; j < R.length; j += g) {
    const q = R.slice(j, j + g);
    G.push([
      q[0][0],
      q[q.length - 1][0],
      q.reduce((a, r) => a + r[2], 0),
      q.reduce((a, r) => a + r[3], 0),
    ]);
  }
  const RR = (t0 ? [[0, 0, 0, 0, C]] : []).concat(R);
  return (
    donut(
      "Capitale e interessi",
      [
        { n: "Capitale", v: C, c: PAL[0] },
        { n: "Interessi", v: ti, c: PAL[1] },
      ],
      "interessi",
    ) +
    plot({
      t: "Composizione della rata" + (g > 1 ? " (aggregata)" : ""),
      xs: G.map((_, j) => j + 1),
      stack: 1,
      bars: [
        { n: "Quota capitale", c: PAL[0], v: G.map((x) => x[2]) },
        { n: "Quota interessi", c: PAL[1], v: G.map((x) => x[3]) },
      ],
      lb: G.map((x) =>
        g > 1 ? `Periodi ${fg(x[0])}–${fg(x[1])}` : `Periodo ${fg(x[0])}`,
      ),
      xf: (x) => fg(Math.round(R[0][0] + (x - 1) * g)),
    }) +
    plot({
      t: "Debito residuo",
      xs: RR.map((r) => r[0]),
      zero: 1,
      lines: [{ n: "Debito residuo", c: PAL[2], a: 1, v: RR.map((r) => r[4]) }],
      lb: RR.map((r) => "Periodo " + fg(r[0])),
    })
  );
}
