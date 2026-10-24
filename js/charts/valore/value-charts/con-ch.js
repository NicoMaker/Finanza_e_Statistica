function conCh(C, i, dl, t) {
  if (!isFinite(dl)) return "";
  const T0 = t > 0 ? t : 1,
    xs = [...Array(41)].map((_, j) => (T0 * j) / 40),
    xm = Math.max(20, Math.ceil(i * 180)),
    ys = [...Array(41)].map((_, j) => (xm * j) / 40);
  return (
    plot({
      t: "Capitalizzazione continua (= composta) vs semplice",
      xs,
      zero: 1,
      lines: [
        {
          n: "Continua C·e^(δt)",
          c: PAL[0],
          a: 1,
          v: xs.map((x) => C * Math.exp(dl * x)),
        },
        {
          n: "Interesse semplice",
          c: PAL[1],
          d: "5 4",
          v: xs.map((x) => C * (1 + i * x)),
        },
        {
          n: "Sconto C·e^(−δt)",
          c: PAL[2],
          v: xs.map((x) => C * Math.exp(-dl * x)),
        },
      ],
      lb: xs.map((x) => "t = " + sh(x)),
    }) +
    plot({
      t: "Relazione tra i e δ",
      xs: ys,
      lines: [
        {
          n: "δ = ln(1+i)",
          c: PAL[0],
          a: 1,
          v: ys.map((x) => Math.log(1 + x / 100) * 100),
        },
        { n: "δ = i", c: PAL[1], d: "5 4", v: ys },
      ],
      marks: [
        {
          x: i * 100,
          y: dl * 100,
          c: PAL[3],
          l: `i = ${f2(i * 100)}% → δ = ${f2(dl * 100)}%`,
        },
      ],
      yf: (x) => f2(x) + "%",
      xf: (x) => sh(x) + "%",
      lb: ys.map((x) => "i = " + f2(x) + "%"),
    })
  );
}
