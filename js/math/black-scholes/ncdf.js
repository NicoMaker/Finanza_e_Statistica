// Distribuzione normale e formula di Black-Scholes (sezione Opzioni)
const ncdf = (x) => {
  const t = 1 / (1 + 0.2316419 * Math.abs(x)),
    p =
      0.3989422804014327 *
      Math.exp((-x * x) / 2) *
      t *
      (0.31938153 +
        t *
          (-0.356563782 +
            t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x > 0 ? 1 - p : p;
};
