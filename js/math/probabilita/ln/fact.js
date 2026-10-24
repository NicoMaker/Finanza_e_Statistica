// ln n!: esatto fino a 170! (poi Lanczos)
const lnFact = (n) =>
  n < 2 ? 0 : n <= 170 ? Math.log(Number(bFact(n))) : lnGamma(n + 1);
