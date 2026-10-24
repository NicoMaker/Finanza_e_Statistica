// Grafico della sezione McLaurin: f(x), polinomio P_n(x) e tangente P_1(x)
function macChart(F, v, n, ex) {
  const [lo, hi] = macRange(v.fn, v.x, v.al),
    xs = sxXs((p) => F.f(p, v.al), lo, hi),
    cl = (y) => Math.max(-50, Math.min(50, y));
  if (xs.length < 2)
    return `<p class="note">Il grafico non c'è: la funzione non è definita vicino a 0 e a x.</p>`;
  return plot({
    t: "Funzione e polinomio di McLaurin",
    xs,
    lines: [
      { n: "f(x)", c: PAL[0], a: 1, v: xs.map((p) => cl(F.f(p, v.al))) },
      {
        n: "Pₙ(x)",
        c: PAL[3],
        d: "5 4",
        v: xs.map((p) => cl(macPn(F, n, p, v.al))),
      },
      {
        n: "P₁(x)",
        c: PAL[1],
        d: "2 3",
        v: xs.map((p) => cl(macPn(F, 1, p, v.al))),
      },
    ],
    marks: [
      { x: v.x, y: cl(ex), c: PAL[2], l: "f(" + f2(v.x) + ") = " + f4(ex) },
    ],
    xf: (p) => f2(p),
    lb: xs.map((p) => "x = " + f2(p)),
  });
}
