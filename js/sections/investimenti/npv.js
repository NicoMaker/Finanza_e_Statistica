// Sezione «VAN e TIR»: formule (FM.npv) e calcolatore (T.npv)
FM.npv = eq(
  `<b>VAN</b><i>VAN</i>(<i>r</i>) = Σ<sub>t=0…n</sub> <i>F</i><sub>t</sub>(1+<i>r</i>)<sup>−t</sup>`,
  `<b>TIR</b>trova <i>r*</i> tale che <i>VAN</i>(<i>r*</i>) = 0`,
  `<b>Criterio</b><i>VAN</i> &gt; 0 ⇒ il progetto crea valore ; &nbsp;<i>r*</i> &gt; <i>r</i> ⇒ accettabile`,
);
T.npv = {
  n: "VAN e TIR",
  s: "r*",
  fm: FM.npv,
  f: [
    { k: "r", l: "Tasso di attualizzazione (%)", v: 8 },
    {
      k: "fl",
      l: "Flussi di cassa da t = 0 (separati da ; o a capo)",
      t: "a",
      v: "-1000; 300; 400; 500; 200",
    },
  ],
  c(v) {
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
      if (pb == "—" && (cum += c) >= 0 && k > 0) pb = k + " periodi";
    });
    let dc = 0,
      dpb = "—";
    f.forEach((c, k) => {
      dc += c / (1 + r) ** k;
      if (dpb == "—" && dc >= 0 && k > 0) dpb = k + " periodi";
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
  },
};
