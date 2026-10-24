// Calcolo dei risultati
T.dur.c = function (v) {
  const T = v.a * v.au,
    p = v.pu == "f" ? 1 / v.p : v.p * v.pu,
    Y = v.y / 100;
  if (!(T > 0) || !(p > 0) || !isFinite(p))
    return '<p class="err">Scadenza o periodicità non valide.</p>';
  if (T / p > 5000)
    return '<p class="err">Troppe cedole (max 5.000): aumenta la periodicità.</p>';
  const ts = [];
  for (let k = 1; k * p < T - 1e-9; k++) ts.push(k * p);
  ts.push(T);
  let P = 0,
    D = 0,
    X = 0,
    prev = 0;
  const cfs = [];
  ts.forEach((t, j) => {
    const last = j == ts.length - 1,
      cf = ((v.F * v.c) / 100) * (t - prev) + (last ? v.F : 0),
      d = (1 + Y) ** -t;
    cfs.push(cf);
    prev = t;
    P += cf * d;
    D += cf * d * t;
    X += (cf * t * (t + 1) * d) / (1 + Y) ** 2;
  });
  const Dm = D / P,
    Dx = Dm / (1 + Y),
    Cv = X / P,
    dr = v.dr / 100,
    dP = -Dx * P * dr,
    dP2 = P * (-Dx * dr + 0.5 * Cv * dr * dr);
  return (
    ks([
      K("Prezzo", f2(P), 1),
      K("Duration (Macaulay)", f4(Dm) + " anni"),
      K("Duration modificata", f4(Dx)),
      K("Convessità", f4(Cv)),
      K("Numero cedole", fg(ts.length)),
    ]) +
    ks([
      K("ΔP ≈ −D·P·Δr/(1+r)", f2(dP)),
      K("Nuovo prezzo P′", f2(P + dP)),
      K("Variazione %", f2((dP / P) * 100) + "%"),
      K("P′ con convessità", f2(P + dP2)),
    ]) +
    `<p class="note">Cedola ogni ${f4(p * 365).replace(/,0+$/, "")} giorni circa (${f4(p)} anni). D = Σ F·v(t)·t / Σ F·v(t): la media dei tempi pesata per i flussi attualizzati. Se i tassi salgono il prezzo scende, e viceversa.</p>` +
    durCh(ts, cfs, Y, P, Dm, Dx, Cv)
  );
};
