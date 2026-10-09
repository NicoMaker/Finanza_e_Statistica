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
function rendCh(fl, i, a) {
  const N = fl.length;
  if (N < 1) return "";
  const ts = fl.map((_, k) => k + a);
  let A = 0;
  const ac = fl.map((x) => (A = A * (1 + i) + x)),
    xe = a ? ts : ts.concat(N),
    ye = a ? ac : ac.concat(A * (1 + i));
  return (
    plot({
      t: "Rata nominale e valore attuale",
      xs: ts,
      bars: [
        { n: "Rata", c: PAL[0], v: fl },
        {
          n: "Valore attuale",
          c: PAL[2],
          v: fl.map((x, k) => x * (1 + i) ** -(k + a)),
        },
      ],
      lb: ts.map((t) => "t = " + t),
    }) +
    plot({
      t: "Montante accumulato nel tempo",
      xs: xe,
      zero: 1,
      lines: [{ n: "Montante", c: PAL[1], a: 1, v: ye }],
      lb: xe.map((t) => "t = " + t),
    })
  );
}
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
