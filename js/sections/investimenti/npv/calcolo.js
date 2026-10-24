// Calcolo dei risultati
T.npv.c = function (v) {
  const f = nums(v.fl),
    r = v.r / 100;
  if (f.length < 2) return '<p class="err">Inserisci almeno due flussi.</p>';
  const N = (x) => f.reduce((s, c, k) => s + c / (1 + x) ** k, 0),
    van = N(r);
  let lo = -0.9999,
    hi = 100,
    irr = NaN;
  if (N(lo) * N(hi) < 0) {
    for (let j = 0; j < 200; j++) {
      const mid = (lo + hi) / 2;
      N(lo) * N(mid) <= 0 ? (hi = mid) : (lo = mid);
    }
    irr = (lo + hi) / 2;
  }
  let cum = 0,
    pb = "—";
  f.forEach((c, k) => {
    if (pb == "—" && (cum += c) >= 0 && k > 0) pb = fg(k) + " periodi";
  });
  let dc = 0,
    dpb = "—";
  f.forEach((c, k) => {
    dc += c / (1 + r) ** k;
    if (dpb == "—" && dc >= 0 && k > 0) dpb = fg(k) + " periodi";
  });
  const pi = f[0] < 0 ? 1 + van / -f[0] : NaN;
  return (
    ks([
      K("VAN (NPV)", f2(van), 1),
      K("TIR (IRR)", isNaN(irr) ? "non definito" : f4(irr * 100) + "%"),
      K("Payback", pb),
      K("Payback scontato", dpb),
      K("Indice di profitabilità", isFinite(pi) ? f4(pi) : "—"),
    ]) +
    `<p class="note">${van > 0 ? "VAN positivo: il progetto crea valore." : "VAN non positivo: il progetto non remunera il costo del capitale."}</p>` +
    npvCh(f, r, van, irr)
  );
};
