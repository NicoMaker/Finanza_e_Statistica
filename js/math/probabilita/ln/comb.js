const lnComb = (n, k) =>
  k < 0 || k > n ? -Infinity : lnFact(n) - lnFact(k) - lnFact(n - k);
