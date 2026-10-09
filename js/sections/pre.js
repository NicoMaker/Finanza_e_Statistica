// Sezione «Prestiti»: formule (FM.pre) e calcolatore (T.pre)
FM.pre = eq(
  `<b>Rata</b><i>R</i> = ${fr("<i>C</i>·<i>i</i>", "1 − (1+<i>i</i>)<sup>−n</sup>")} , &nbsp;<i>i</i> = ${fr("TAN", "12")}`,
  `<b>TAEG</b>(1+<i>j</i>)<sup>12</sup> − 1 &nbsp;con&nbsp; Σ<sub>k=1…n</sub> (<i>R</i>+<i>s</i>)(1+<i>j</i>)<sup>−k</sup> = <i>C</i> − <i>e</i>`,
  `<b>Sostenibilità</b>${fr("<i>R</i>", "reddito netto")} ≤ ${fr("1", "3")}`,
  `<b>Tasso variabile</b><i>R′</i> = ${fr("<i>D</i><sub>k</sub>·<i>i′</i>", "1 − (1+<i>i′</i>)<sup>−(n−k)</sup>")}`,
);
T.pre = {
  n: "Prestito personale",
  s: "€",
  fm: FM.pre,
  f: [
    { k: "C", l: "Importo del prestito (€)", v: 10000 },
    { k: "r", l: "TAN – tasso annuo nominale (%)", v: 7 },
    { k: "n", l: "Durata", v: 60 },
    {
      k: "nu",
      l: "Unità di durata",
      t: "s",
      o: [
        [1, "Mesi"],
        [12, "Anni"],
      ],
      v: 1,
    },
    { k: "w", l: "Reddito netto mensile (€, facoltativo)", v: 0 },
    { k: "e", l: "Spese di istruttoria (€, per il TAEG)", v: 0 },
    { k: "ei", l: "Spese di incasso per rata (€, per il TAEG)", v: 0 },
    {
      k: "k",
      l: "Simulazione tasso variabile: rate già pagate",
      v: 12,
    },
    { k: "r2", l: "Nuovo TAN dopo le rate pagate (%)", v: 9 },
  ],
  c(v) {
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
        K("Debito residuo dopo " + k + " rate", f2(Ek)),
        K("Durata residua", M + " mesi"),
        K("Nuova rata", f2(p2), 1),
        K(
          "Variazione della rata",
          (p2 >= p ? "+" : "−") + f2(Math.abs(p2 - p)),
        ),
      ]) +
      tbl(R) +
      ammCh(R, C, 1, ti) +
      preCh(C, i, N)
    );
  },
};
