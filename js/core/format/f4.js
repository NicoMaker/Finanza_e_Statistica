const f4 = (n) =>
  isFinite(n)
    ? nf(n, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      })
    : "—";
