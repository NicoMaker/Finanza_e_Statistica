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
      lb: ts.map((t) => "t = " + fg(t)),
    }) +
    plot({
      t: "Montante accumulato nel tempo",
      xs: xe,
      zero: 1,
      lines: [{ n: "Montante", c: PAL[1], a: 1, v: ye }],
      lb: xe.map((t) => "t = " + fg(t)),
    })
  );
}
