// Calcolo dei risultati
T.pre.c = function (v) {
  const N = Math.round(v.n * v.nu),
    C = v.C,
    i = v.r / 1200,
    rt = (c, i, n) => (i ? (c * i) / (1 - (1 + i) ** -n) : c / n);
  if (!(N >= 1 && N <= 600) || !(C > 0))
    return '<p class="err">Controlla importo e durata (max 600 mesi).</p>';
  const p = rt(C, i, N),
    R = [];
  let E = C;
  for (let k = 1; k <= N; k++) {
    const I = E * i,
      Q = p - I;
    E -= Q;
    R.push([k, p, Q, I, Math.max(E, 0)]);
  }
  const tot = p * N,
    ti = tot - C,
    x = p + v.ei,
    g = (j) => {
      let s = 0;
      for (let k = 1; k <= N; k++) s += x * (1 + j) ** -k;
      return s - (C - v.e);
    };
  let lo = 0,
    hi = 1;
  for (let q = 0; q < 80; q++) {
    const m = (lo + hi) / 2;
    g(m) > 0 ? (lo = m) : (hi = m);
  }
  const taeg = ((1 + lo) ** 12 - 1) * 100,
    qw = v.w > 0 ? p / v.w : 0,
    inc =
      v.w > 0
        ? `<p class="note" style="color:${qw <= 1 / 3 ? "#10b981" : "#f43f5e"};font-weight:600">La rata è il ${f2(qw * 100)}% del reddito netto: ${qw <= 1 / 3 ? "entro" : "oltre"} la soglia prudenziale di un terzo (33,33%).</p>`
        : "",
    k = Math.max(0, Math.min(N - 1, Math.round(v.k))),
    Ek = k ? R[k - 1][4] : C,
    M = N - k,
    p2 = rt(Ek, v.r2 / 1200, M);
  return (
    ks([
      K("Rata mensile", f2(p), 1),
      K("Totale interessi", f2(ti)),
      K("Totale rimborsato", f2(tot)),
      K("TAEG", f2(taeg) + "%"),
    ]) +
    inc +
    `<p class="note">Piano francese a tasso fisso: rata = C·i / (1 − (1+i)^−n), con i = TAN/12. Il TAEG include solo le spese che inserisci.</p>` +
    `<h3 style="font-size:.95rem;margin:18px 0 10px">Simulazione tasso variabile</h3>` +
    ks([
      K("Debito residuo dopo " + fg(k) + " rate", f2(Ek)),
      K("Durata residua", fg(M) + " mesi"),
      K("Nuova rata", f2(p2), 1),
      K("Variazione della rata", (p2 >= p ? "+" : "−") + f2(Math.abs(p2 - p))),
    ]) +
    tbl(R) +
    ammCh(R, C, 1, ti) +
    preCh(C, i, N)
  );
};
