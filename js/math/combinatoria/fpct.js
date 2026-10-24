// Probabilità come percentuale leggibile (anche per valori minuscoli)
function fpct(p) {
  if (!isFinite(p)) return "—";
  if (p === 0) return "0%";
  const x = p * 100;
  if (Math.abs(x) < 1e-4)
    return (
      x
        .toExponential(3)
        .replace(".", ",")
        .replace(
          /e([+-]?\d+)/,
          (m, e) => ` × 10<sup>${e.replace("-", "−").replace("+", "")}</sup>`,
        ) + "%"
    );
  return nf(x, { maximumSignificantDigits: 6 }) + "%";
}
