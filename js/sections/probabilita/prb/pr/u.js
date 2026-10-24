// Probabilità: percentuale leggibile e frazione "1 su N"
const prU = (p) =>
  p > 0 && p < 1
    ? "1 su " + fg(+(1 / p).toPrecision(4))
    : p >= 1
      ? "certo"
      : "impossibile";
