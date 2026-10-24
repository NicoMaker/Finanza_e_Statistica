// Grafici di valore attuale, montante, rendite e capitalizzazione continua
function somCh(C, i, n) {
  if (!(n > 0)) return "";
  const xs = [...Array(41)].map((_, j) => (n * j) / 40);
  return plot({
    t: "Capitalizzazione e attualizzazione",
    xs,
    zero: 1,
    lines: [
      {
        n: "Montante C(1+i)^t",
        c: PAL[0],
        a: 1,
        v: xs.map((t) => C * (1 + i) ** t),
      },
      {
        n: "Valore attuale C(1+i)^−t",
        c: PAL[2],
        a: 1,
        v: xs.map((t) => C * (1 + i) ** -t),
      },
    ],
    lb: xs.map((t) => "t = " + sh(t)),
  });
}
