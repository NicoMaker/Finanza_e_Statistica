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
const npdf = (x) => 0.3989422804014327 * Math.exp((-x * x) / 2);
const bsf = (S, K, T, r, s, q) => {
  const sq = s * Math.sqrt(T),
    d1 = (Math.log(S / K) + (r - q + (s * s) / 2) * T) / sq,
    d2 = d1 - sq,
    dq = Math.exp(-q * T),
    er = Math.exp(-r * T);
  return {
    d1,
    d2,
    dq,
    er,
    c: S * dq * ncdf(d1) - K * er * ncdf(d2),
    p: K * er * ncdf(-d2) - S * dq * ncdf(-d1),
  };
};
