// Sezione «Situazione patrimoniale»: attivo (bene), passivo (mutuo) e patrimonio netto nel tempo
FM.sp = eq(
  `<b>Attivo</b><i>A</i><sub>k</sub> = <i>V</i>·(1+<i>g</i>)<sup>k/m</sup>`,
  `<b>Passivo</b><i>D</i><sub>k</sub> = debito residuo del mutuo (ammortamento francese, rata ${fr("<i>C</i>·<i>i</i>", "1−(1+<i>i</i>)<sup>−N</sup>")})`,
  `<b>Patrimonio netto</b><i>PN</i><sub>k</sub> = <i>A</i><sub>k</sub> − <i>D</i><sub>k</sub> , &nbsp;LTV<sub>k</sub> = ${fr("<i>D</i><sub>k</sub>", "<i>A</i><sub>k</sub>")}`,
);
T.sp = {
  n: "Situazione patrimoniale",
  s: "S",
  fm: FM.sp,
  f: [
    { k: "vb", l: "Valore del bene (€)", v: 250000 },
    { k: "g", l: "Rivalutazione annua del bene (%)", v: 1.5 },
    { k: "C", l: "Mutuo / debito iniziale (€)", v: 175000 },
    { k: "r", l: "Tasso nominale annuo (%)", v: 3.2 },
    { k: "a", l: "Durata (anni)", v: 25 },
    { k: "m", l: "Rate all'anno", v: 12 },
  ],
  c(v) {
    const m = Math.round(v.m),
      N = Math.round(v.a * m);
    if (!(m >= 1 && m <= 52) || !(N >= 1 && N <= 600))
      return ER("Rate o durata non valide (max 600 rate).");
    if (!(v.C > 0)) return ER("Inserisci un debito iniziale maggiore di zero.");
    const i = v.r / 100 / m,
      rata = i > 0 ? (v.C * i) / (1 - (1 + i) ** -N) : v.C / N,
      R = [];
    let D = v.C;
    for (let k = 1; k <= N; k++) {
      const I = D * i,
        Q = rata - I;
      D = k == N ? 0 : D - Q;
      R.push([k, rata, Q, I, D]);
    }
    return (
      ks([
        K("Rata", f2(rata), 1),
        K("Interessi totali", f2(rata * N - v.C)),
        K("Numero rate", N),
      ]) + patrimonio({ C: v.C, m, vb: v.vb, g: v.g, P: ptsPiano(R, v.C, 0) })
    );
  },
};
