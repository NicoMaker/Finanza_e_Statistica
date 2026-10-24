const TAYF = {
  exp: { f: Math.exp, d: (k, a) => Math.exp(a) },
  sin: { f: Math.sin, d: (k, a) => Math.sin(a + (k * Math.PI) / 2) },
  cos: { f: Math.cos, d: (k, a) => Math.cos(a + (k * Math.PI) / 2) },
  ln: {
    f: Math.log,
    d: (k, a) =>
      k ? ((-1) ** (k - 1) * taylorFact(k - 1)) / a ** k : Math.log(a),
  },
  geo: {
    f: (x) => 1 / (1 - x),
    d: (k, a) => taylorFact(k) / (1 - a) ** (k + 1),
  },
};
