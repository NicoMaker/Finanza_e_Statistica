// Sezione «Ammortamento»: formule (FM.amm) e calcolatore (T.amm)
FM.amm = eq(
  `<b>Francese</b><i>R</i> = ${fr("<i>C</i>·<i>i</i>", "1 − <i>v</i><sup>n</sup>")} = ${fr("<i>C</i>", "<i>a</i><sub>n⌉i</sub>")} , &nbsp;<i>I</i><sub>k</sub> = <i>i</i>·<i>D</i><sub>k−1</sub> , &nbsp;<i>C</i><sub>k</sub> = <i>R</i> − <i>I</i><sub>k</sub>`,
  `<b>Italiano</b><i>C</i><sub>k</sub> = ${fr("<i>C</i>", "<i>n</i>")} , &nbsp;<i>I</i><sub>k</sub> = <i>i</i>·<i>D</i><sub>k−1</sub> , &nbsp;<i>R</i><sub>k</sub> = <i>C</i><sub>k</sub> + <i>I</i><sub>k</sub>`,
  `<b>Tedesco</b><i>R</i> = ${fr("<i>C</i>·<i>d</i>", "1 − (1−<i>d</i>)<sup>n</sup>")} , &nbsp;<i>d</i> = ${fr("<i>i</i>", "1+<i>i</i>")} &nbsp;(interessi anticipati)`,
  `<b>Americano</b><i>R</i><sub>k</sub> = <i>C</i>·<i>i</i> (<i>k</i> &lt; <i>n</i>) , &nbsp;<i>R</i><sub>n</sub> = <i>C</i>·<i>i</i> + <i>C</i>`,
  `<b>Ricostituzione</b><i>s</i> = ${fr("<i>C</i>·<i>i′</i>", "(1+<i>i′</i>)<sup>n</sup> − 1")} = ${fr("<i>C</i>", "<i>s</i><sub>n⌉i′</sub>")} , &nbsp;<i>F</i><sub>k</sub> = <i>F</i><sub>k−1</sub>(1+<i>i′</i>) + <i>s</i> , &nbsp;<i>F</i><sub>n</sub> = <i>C</i> , &nbsp;esborso = <i>C</i>·<i>i</i> + <i>s</i>`,
  `<b>Patrimonio</b><i>A</i><sub>k</sub> = <i>V</i>·(1+<i>g</i>)<sup>k/m</sup> , &nbsp;<i>PN</i><sub>k</sub> = <i>A</i><sub>k</sub> − <i>D</i><sub>k</sub> , &nbsp;LTV<sub>k</sub> = ${fr("<i>D</i><sub>k</sub>", "<i>A</i><sub>k</sub>")} (<i>V</i> valore del bene, <i>g</i> rivalutazione annua, <i>D</i><sub>k</sub> debito residuo)`,
  `<b>Tasso del periodo</b><i>i</i><sub>m</sub> = (1+<i>i</i>)<sup>1/m</sup> − 1 , &nbsp;<i>v</i> = (1+<i>i</i>)<sup>−1</sup>`,
);
T.amm = {
  n: "Ammortamento",
  s: "a",
  fm: FM.amm,
  f: [
    { k: "C", l: "Capitale (€)", v: 100000 },
    { k: "r", l: "Tasso annuo effettivo (%)", v: 4 },
    { k: "n", l: "Durata (anni)", v: 10 },
    {
      k: "m",
      l: "Rate per anno",
      t: "s",
      o: [
        [1, "Annuale"],
        [2, "Semestrale"],
        [4, "Trimestrale"],
        [12, "Mensile"],
      ],
      v: 12,
    },
    {
      k: "t",
      l: "Metodo",
      t: "s",
      o: [
        ["fr", "Francese (rata costante)"],
        ["it", "Italiano (quota capitale costante)"],
        ["de", "Tedesco (interessi anticipati)"],
        ["am", "Americano (rimborso a scadenza)"],
      ],
      v: "fr",
    },
    {
      k: "ric",
      l: "Prospetto con rata costitutiva del capitale",
      t: "s",
      o: [
        ["n", "No (solo interessi)"],
        ["s", "Sì (fondo di ricostituzione)"],
      ],
      v: "s",
      s: (v) => v.t == "am",
    },
    {
      k: "rr",
      l: "Tasso annuo effettivo di ricostituzione (%)",
      v: 3,
      s: (v) => v.t == "am" && v.ric == "s",
    },
    {
      k: "vb",
      l: "Valore del bene finanziato (€) — per il patrimonio",
      v: 125000,
    },
    { k: "g", l: "Rivalutazione annua del bene (%)", v: 0 },
  ],
  c(v) {
    const m = +v.m,
      N = Math.round(v.n * m),
      i = (1 + v.r / 100) ** (1 / m) - 1,
      C = v.C,
      R = [];
    let E = C,
      t0 = 1;
    if (N < 1 || N > 600) return '<p class="err">Durata non valida.</p>';
    if (v.t == "am" && v.ric == "s") return ricPlan(v, N, i);
    if (v.t == "fr") {
      const p = (C * i) / (1 - (1 + i) ** -N) || C / N;
      for (let k = 1; k <= N; k++) {
        const I = E * i,
          Q = p - I;
        E -= Q;
        R.push([k, p, Q, I, E]);
      }
    }
    if (v.t == "it") {
      const Q = C / N;
      for (let k = 1; k <= N; k++) {
        const I = E * i;
        E -= Q;
        R.push([k, Q + I, Q, I, E]);
      }
    }
    if (v.t == "am") {
      for (let k = 1; k <= N; k++) {
        const I = C * i,
          Q = k == N ? C : 0;
        E = C - Q;
        R.push([k, I + Q, Q, I, E]);
      }
    }
    if (v.t == "de") {
      t0 = 0;
      const d = i / (1 + i),
        p = (C * d) / (1 - (1 - d) ** N) || C / N;
      for (let k = 0; k < N; k++) {
        const I = i * (E - p),
          Q = p - I;
        E -= Q;
        R.push([k, p, Q, I, Math.max(E, 0)]);
      }
    }
    const tot = R.reduce((a, r) => a + r[1], 0),
      ti = tot - C;
    return (
      ks([
        K(
          v.t == "fr" || v.t == "de" ? "Rata costante" : "Prima rata",
          f2(R[0][1]),
          1,
        ),
        K("Totale interessi", f2(ti)),
        K("Totale pagato", f2(tot)),
        K("Tasso periodale", f4(i * 100) + "%"),
      ]) +
      (v.t == "de"
        ? '<p class="note">Interessi anticipati: le rate sono pagate all\'inizio di ogni periodo (t = 0 … n−1).</p>'
        : "") +
      (v.t == "am"
        ? '<p class="note">Per vedere il prospetto con la rata costitutiva del capitale, scegli «Sì» in «Prospetto con rata costitutiva».</p>'
        : "") +
      `<div class="tb"><table><tr><th>${t0 ? "Rata" : "Epoca t"}</th><th>Importo</th><th>Quota capitale</th><th>Quota interessi</th><th>Debito residuo</th></tr>${R.map(
        (r) =>
          `<tr><td>${r[0]}</td>${r
            .slice(1)
            .map((x) => `<td>${f2(x)}</td>`)
            .join("")}</tr>`,
      ).join("")}</table></div>` +
      ammCh(R, C, t0, ti) +
      patrimonio({ C, m, vb: v.vb, g: v.g, P: ptsPiano(R, C, t0) })
    );
  },
};
