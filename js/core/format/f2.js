const f2 = (n) =>
  isFinite(n)
    ? nf(n, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "—";
