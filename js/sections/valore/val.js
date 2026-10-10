// Sezione «Valore attuale e montante»: formule (FM.val) e calcolatore (T.val)
FM.val = eq(
  `<b>Somma</b><i>M</i> = <i>C</i>(1+<i>i</i>)<sup>n</sup> , &nbsp;<i>V</i> = <i>M</i>(1+<i>i</i>)<sup>−n</sup>`,
  `<b>Posticipata</b><i>V</i> = <i>R</i>·<i>a</i><sub>n⌉i</sub> = <i>R</i> ${fr("1 − <i>v</i><sup>n</sup>", "<i>i</i>")} , &nbsp;<i>M</i> = <i>R</i>·<i>s</i><sub>n⌉i</sub> = <i>R</i> ${fr("(1+<i>i</i>)<sup>n</sup> − 1", "<i>i</i>")}`,
  `<b>Anticipata</b><i>ä</i><sub>n⌉i</sub> = (1+<i>i</i>)·<i>a</i><sub>n⌉i</sub> , &nbsp;<i>s̈</i><sub>n⌉i</sub> = (1+<i>i</i>)·<i>s</i><sub>n⌉i</sub>`,
  `<b>Rate variabili</b><i>V</i> = Σ<sub>k</sub> <i>R</i><sub>k</sub>·<i>v</i><sup>k</sup> , &nbsp;<i>M</i> = <i>V</i>(1+<i>i</i>)<sup>n</sup>`,
);
T.val = {
  n: "Valore attuale e montante",
  s: "v",
  fm: FM.val,
  f: [
    {
      k: "m",
      l: "Operazione",
      t: "s",
      o: [
        ["s", "Somma singola"],
        ["c", "Rendita a rata costante"],
        ["v", "Rendita a rate variabili"],
      ],
      v: "c",
    },
    { k: "C", l: "Importo / rata (€)", v: 1000, s: (v) => v.m != "v" },
    {
      k: "fl",
      l: "Rate (separate da ; o a capo)",
      t: "a",
      v: "1000; 1200; 1500; 1800",
      s: (v) => v.m == "v",
    },
    { k: "n", l: "Durata (periodi)", v: 5, s: (v) => v.m != "v" },
    { k: "i", l: "Tasso per periodo (%)", v: 3 },
    {
      k: "p",
      l: "Rate",
      t: "s",
      o: [
        ["p", "Posticipate (fine periodo)"],
        ["a", "Anticipate (inizio periodo)"],
      ],
      v: "p",
      s: (v) => v.m != "s",
    },
  ],
  c(v) {
    const i = v.i / 100;
    let pv, fv, N;
    if (v.m == "s") {
      N = v.n;
      pv = v.C * (1 + i) ** -N;
      fv = v.C * (1 + i) ** N;
      return (
        ks([
          K("Valore attuale", f2(pv), 1),
          K("Montante", f2(fv)),
          K("Fattore di sconto", f4((1 + i) ** -N)),
        ]) + somCh(v.C, i, N)
      );
    }
    const fl =
        v.m == "c" ? Array(Math.max(0, Math.round(v.n))).fill(v.C) : nums(v.fl),
      a = v.p == "a" ? 0 : 1;
    N = fl.length;
    pv = fl.reduce((s, x, k) => s + x * (1 + i) ** -(k + a), 0);
    fv = pv * (1 + i) ** N;
    return (
      ks([
        K("Valore attuale (t=0)", f2(pv), 1),
        K("Montante (t=" + N + ")", f2(fv)),
        K("Totale rate", f2(fl.reduce((s, x) => s + x, 0))),
        K("Numero rate", N),
      ]) +
      `<p class="note">${v.p == "a" ? "Anticipata: rate a t = 0 … n−1." : "Posticipata: rate a t = 1 … n."} Montante valutato a t = n.</p>` +
      rendCh(fl, i, a)
    );
  },
};
