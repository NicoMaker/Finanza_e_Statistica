// Sezione «Capitalizzazione continua»: formule (FM.con) e calcolatore (T.con)
FM.con = eq(
  `<b>Intensità</b><i>δ</i> = ln(1+<i>i</i>) , &nbsp;<i>i</i> = e<sup><i>δ</i></sup> − 1`,
  `<b>Montante</b><i>M</i> = <i>C</i>·e<sup><i>δt</i></sup> , &nbsp;<b>Valore attuale</b><i>V</i> = <i>C</i>·e<sup>−<i>δt</i></sup>`,
);
T.con = {
  n: "Tasso continuo",
  s: "δ",
  fm: FM.con,
  f: [
    {
      k: "d",
      l: "Dato di partenza",
      t: "s",
      o: [
        ["i", "Tasso annuo effettivo i"],
        ["d", "Intensità istantanea δ"],
      ],
      v: "i",
    },
    { k: "x", l: "Valore (%)", v: 5 },
    { k: "C", l: "Capitale (€)", v: 1000 },
    { k: "t", l: "Tempo (anni)", v: 3 },
  ],
  c(v) {
    const i = v.d == "i" ? v.x / 100 : Math.exp(v.x / 100) - 1,
      dl = Math.log(1 + i);
    return (
      ks([
        K("Intensità δ = ln(1+i)", f4(dl * 100) + "%", 1),
        K("Tasso effettivo i = e^δ − 1", f4(i * 100) + "%"),
        K("Montante C·e^(δt)", f2(v.C * Math.exp(dl * v.t))),
        K("Valore attuale C·e^(−δt)", f2(v.C * Math.exp(-dl * v.t))),
      ]) + conCh(v.C, i, dl, v.t)
    );
  },
};
