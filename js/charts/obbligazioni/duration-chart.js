// Grafico duration e convessità
function durCh(ts, cf, Y, P, Dm, Dx, Cv) {
  const pv = ts.map((t, j) => cf[j] * (1 + Y) ** -t),
    pa = (y) => ts.reduce((s, t, j) => s + cf[j] * (1 + y) ** -t, 0),
    a = Math.max(0.0005, Y - 0.04),
    b = Y + 0.04,
    ys = [...Array(41)].map((_, j) => a + ((b - a) * j) / 40),
    ap = (y, c) => P * (1 - Dx * (y - Y) + c * 0.5 * Cv * (y - Y) ** 2),
    f1 =
      ts.length <= 150
        ? { bars: [{ n: "Valore attuale del flusso", c: PAL[0], v: pv }] }
        : {
            lines: [{ n: "Valore attuale del flusso", c: PAL[0], a: 1, v: pv }],
          };
  return (
    plot({
      t: "Flussi attualizzati e duration",
      xs: ts,
      ...f1,
      zero: 1,
      vl: [{ x: Dm, l: "Duration " + f2(Dm) + " anni", c: PAL[1] }],
      lb: ts.map((t) => "t = " + f2(t) + " anni"),
    }) +
    plot({
      t: "Prezzo in funzione del rendimento",
      xs: ys.map((y) => y * 100),
      lines: [
        { n: "Prezzo reale", c: PAL[0], a: 1, v: ys.map(pa) },
        {
          n: "Approx. duration",
          c: PAL[1],
          d: "5 4",
          v: ys.map((y) => ap(y, 0)),
        },
        {
          n: "Duration + convessità",
          c: PAL[2],
          d: "2 3",
          v: ys.map((y) => ap(y, 1)),
        },
      ],
      marks: [
        {
          x: Y * 100,
          y: P,
          c: PAL[3],
          l: "Prezzo " + f2(P) + " a " + f2(Y * 100) + "%",
        },
      ],
      xf: (x) => f2(x) + "%",
      lb: ys.map((y) => "Rendimento " + f2(y * 100) + "%"),
    })
  );
}
