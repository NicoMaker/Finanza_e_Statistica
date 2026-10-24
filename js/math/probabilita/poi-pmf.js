// Poisson(λ): P(X = k)
const poiPmf = (l, k) =>
  k < 0 || !Number.isInteger(k)
    ? 0
    : l === 0
      ? k === 0
        ? 1
        : 0
      : Math.exp(-l + k * Math.log(l) - lnFact(k));
