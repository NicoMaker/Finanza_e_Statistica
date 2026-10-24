// Tabella di una distribuzione con probabilità puntuale e cumulate
function prTab(nome, xs, ps) {
  let c = 0;
  return TB(
    [nome, "P(X = x)", "P(X ≤ x)", "P(X ≥ x)"],
    xs.map((x, i) => {
      c += ps[i];
      const sup = Math.max(0, 1 - c + ps[i]);
      return [fg(x), fpct(ps[i]), fpct(Math.min(1, c)), fpct(sup)];
    }),
  );
}
