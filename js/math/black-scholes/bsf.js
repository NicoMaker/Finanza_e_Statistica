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
