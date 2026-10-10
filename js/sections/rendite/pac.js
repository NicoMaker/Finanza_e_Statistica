// Sezione «Piani di accumulo»: formule (FM.pac) e calcolatore (T.pac)
FM.pac = eq(
  `<b>Montante</b><i>M</i> = <i>C</i><sub>0</sub>(1+<i>i</i>)<sup>N</sup> + <i>R</i>·<i>s</i><sub>N⌉i</sub> &nbsp;(anticipati: ×(1+<i>i</i>) sulle rate)`,
  `<b>Versamento</b><i>R</i> = ${fr("<i>G</i> − <i>C</i><sub>0</sub>(1+<i>i</i>)<sup>N</sup>", "<i>u</i>·<i>s</i><sub>N⌉i</sub>")}`,
  `<b>Tempo</b><i>N</i> = ${fr("ln[(<i>G</i>·<i>i</i> + <i>R</i>·<i>u</i>) / (<i>C</i><sub>0</sub>·<i>i</i> + <i>R</i>·<i>u</i>)]", "ln(1+<i>i</i>)")} , &nbsp;<i>u</i> = 1 (posticipati) o 1+<i>i</i> (anticipati)`,
);
T.pac = {
  n: "Piano di accumulo",
  s: "P",
  fm: FM.pac,
  f: [
    {
      k: "m",
      l: "Cosa calcolare",
      t: "s",
      o: [
        ["m", "Montante finale"],
        ["r", "Versamento periodico necessario"],
        ["t", "Tempo per raggiungere l’obiettivo"],
      ],
      v: "m",
    },
    { k: "C0", l: "Capitale iniziale (€)", v: 1000 },
    {
      k: "R",
      l: "Versamento periodico (€)",
      v: 200,
      s: (v) => v.m != "r",
    },
    { k: "G", l: "Obiettivo (€)", v: 50000, s: (v) => v.m != "m" },
    { k: "r", l: "Tasso annuo effettivo (%)", v: 4 },
    { k: "n", l: "Durata (anni)", v: 10, s: (v) => v.m != "t" },
    {
      k: "f",
      l: "Versamenti per anno",
      t: "s",
      o: [
        [1, "Annuali"],
        [2, "Semestrali"],
        [4, "Trimestrali"],
        [12, "Mensili"],
      ],
      v: 12,
    },
    {
      k: "p",
      l: "Versamenti",
      t: "s",
      o: [
        ["p", "Posticipati (fine periodo)"],
        ["a", "Anticipati (inizio periodo)"],
      ],
      v: "p",
    },
  ],
  c(v) {
    const f = +v.f,
      i = (1 + v.r / 100) ** (1 / f) - 1,
      u = v.p == "a" ? 1 + i : 1,
      sN = (N) => (i ? ((1 + i) ** N - 1) / i : N);
    let N = Math.round(v.n * f),
      R = v.R;
    if (v.m == "t") {
      if (!(v.R > 0)) return ER("Il versamento deve essere positivo.");
      const Nn = i
        ? Math.log((v.G * i + v.R * u) / (v.C0 * i + v.R * u)) / Math.log(1 + i)
        : (v.G - v.C0) / v.R;
      if (!isFinite(Nn) || Nn < 0)
        return ER("Obiettivo non raggiungibile con questi dati.");
      N = Math.max(1, Math.ceil(Nn - 1e-9));
    }
    if (v.m == "r") R = (v.G - v.C0 * (1 + i) ** N) / (u * sN(N));
    if (!(N >= 1 && N <= 1200))
      return ER("Durata non valida (da 1 a 1200 versamenti).");
    const B = [v.C0],
      V = [v.C0];
    let b = v.C0;
    for (let k = 1; k <= N; k++) {
      b = v.p == "a" ? (b + R) * (1 + i) : b * (1 + i) + R;
      B.push(b);
      V.push(v.C0 + R * k);
    }
    const M = B[N],
      vers = V[N];
    return (
      ks([
        K("Montante finale", f2(M), 1),
        K(v.m == "r" ? "Versamento necessario" : "Versamento periodico", f2(R)),
        K("Totale versato", f2(vers)),
        K("Interessi maturati", f2(M - vers)),
        K("Numero versamenti", N),
        K("Durata", f2(N / f) + " anni"),
        K("Tasso periodale", f4(i * 100) + "%"),
      ]) +
      (v.m == "r" && R < 0
        ? '<p class="note">Il capitale iniziale basta già a superare l’obiettivo: il versamento risulta negativo.</p>'
        : "") +
      plot({
        t: "Crescita del capitale",
        xs: B.map((_, k) => k),
        stack: 1,
        bars: [
          { n: "Totale versato", c: PAL[0], v: V },
          {
            n: "Interessi maturati",
            c: PAL[1],
            v: B.map((x, k) => x - V[k]),
          },
        ],
        lb: B.map((_, k) => "Periodo " + k),
      })
    );
  },
};
