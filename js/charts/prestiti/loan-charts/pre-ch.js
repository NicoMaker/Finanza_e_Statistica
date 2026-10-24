function preCh(C, i, N) {
  const ms = [
      ...new Set(
        [...Array(20)].map((_, j) =>
          Math.max(1, Math.round(N * (0.25 + (1.75 * j) / 19))),
        ),
      ),
    ].sort((a, b) => a - b),
    r = (m) => (i ? (C * i) / (1 - (1 + i) ** -m) : C / m),
    xs = ms.map((m) => m / 12),
    lb = ms.map((m) => fg(m) + " mesi");
  return (
    plot({
      t: "Rata mensile al variare della durata (anni)",
      xs,
      lines: [{ n: "Rata mensile", c: PAL[0], a: 1, v: ms.map(r) }],
      marks: [
        {
          x: N / 12,
          y: r(N),
          c: PAL[3],
          l: "La tua scelta: " + fg(N) + " mesi, rata " + f2(r(N)),
        },
      ],
      lb,
    }) +
    plot({
      t: "Interessi totali al variare della durata (anni)",
      xs,
      lines: [
        {
          n: "Interessi totali",
          c: PAL[1],
          a: 1,
          v: ms.map((m) => r(m) * m - C),
        },
      ],
      marks: [
        {
          x: N / 12,
          y: r(N) * N - C,
          c: PAL[3],
          l: "La tua scelta: " + fg(N) + " mesi, interessi " + f2(r(N) * N - C),
        },
      ],
      lb,
    })
  );
}
