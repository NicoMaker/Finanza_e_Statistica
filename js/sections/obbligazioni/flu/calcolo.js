// Calcolo dei risultati
T.flu.c = function (v) {
  const F = nums(v.fl),
    t = nums(v.tt),
    n = Math.min(F.length, t.length),
    Y = v.i / 100;
  if (n < 1 || Y <= -1)
    return '<p class="err">Inserisci importi e scadenze (stesso numero) e un tasso valido.</p>';
  const q = F.slice(0, n)
      .map((f, k) => [t[k], f])
      .sort((a, b) => a[0] - b[0]),
    ts = q.map((x) => x[0]),
    cf = q.map((x) => x[1]),
    S = cf.reduce((a, b) => a + b, 0),
    sm = (g) => cf.reduce((s, f, k) => s + f * g(ts[k]), 0),
    P = sm((x) => (1 + Y) ** -x),
    D = sm((x) => x * (1 + Y) ** -x) / P,
    Dx = D / (1 + Y),
    Cv = sm((x) => x * (x + 1) * (1 + Y) ** (-x - 2)) / P,
    ta = v.tx,
    Da =
      ta +
      sm((x) => (x - ta) * (1 + Y) ** -(x - ta)) /
        sm((x) => (1 + Y) ** -(x - ta)),
    dr = v.dr / 100,
    dP = -Dx * P * dr,
    dP2 = P * (-Dx * dr + 0.5 * Cv * dr * dr);
  return (
    ks([
      K("Duration D", f4(D) + " anni", 1),
      K("Scadenza media aritmetica", f4(sm((x) => x) / S) + " anni"),
      K("Valore attuale (REA)", f2(P)),
      K("Duration in t* = " + sh(ta), f4(Da) + " anni"),
      K("Duration modificata", f4(Dx)),
      K("Convessità", f4(Cv)),
    ]) +
    ks([
      K("ΔP ≈ −D·P·Δr/(1+r)", f2(dP)),
      K("Nuovo valore P′", f2(P + dP)),
      K("Variazione %", f2((dP / P) * 100) + "%"),
      K("P′ con convessità", f2(P + dP2)),
    ]) +
    `<p class="note">D = Σ F·v(t)·t / Σ F·v(t). Scadenza media aritmetica = Σ F·t / Σ F (non richiede il tasso). La duration non cambia scegliendo un diverso t*: D(t*) = t* + Σ F·(t−t*)·v(t−t*) / Σ F·v(t−t*).</p>` +
    (Y > 0 ? durCh(ts, cf, Y, P, D, Dx, Cv) : "")
  );
};
