// Sezione «Tassi e conversioni»: formule (FM.tas) e calcolatore (T.tas)
FM.tas = eq(
  `<b>Effettivo ↔ nominale</b><i>i</i> = (1 + ${fr("<i>j</i><sub>m</sub>", "<i>m</i>")})<sup>m</sup> − 1 , &nbsp;<i>j</i><sub>m</sub> = <i>m</i>[(1+<i>i</i>)<sup>1/m</sup> − 1]`,
  `<b>Sconto</b><i>d</i> = ${fr("<i>i</i>", "1+<i>i</i>")} , &nbsp;<i>i</i> = ${fr("<i>d</i>", "1−<i>d</i>")} , &nbsp;<i>v</i> = 1 − <i>d</i>`,
  `<b>Intensità</b><i>δ</i> = ln(1+<i>i</i>) = lim<sub>m→∞</sub> <i>j</i><sub>m</sub>`,
);
T.tas = {
  n: "Tassi e conversioni",
  s: "i",
  fm: FM.tas,
  f: [
    {
      k: "d",
      l: "Dato di partenza",
      t: "s",
      o: [
        ["i", "Tasso annuo effettivo i"],
        ["j", "Tasso nominale convertibile j(m)"],
        ["d", "Tasso annuo di sconto d"],
      ],
      v: "i",
    },
    { k: "x", l: "Valore (%)", v: 5 },
    { k: "m", l: "Frazionamenti annui m", v: 12 },
  ],
  c(v) {
    const m = Math.max(1, Math.round(v.m)),
      x = v.x / 100,
      i = v.d == "i" ? x : v.d == "j" ? (1 + x / m) ** m - 1 : x / (1 - x);
    if (!isFinite(i) || i <= -1) return ER("Valore non valido.");
    const ms = [1, 2, 3, 4, 6, 12, 52, 365],
      m2 = [...Array(24)].map((_, k) => k + 1),
      dl = Math.log(1 + i);
    return (
      ks([
        K("Tasso effettivo i", f4(i * 100) + "%", 1),
        K(
          "Nominale j(" + m + ")",
          f4(m * ((1 + i) ** (1 / m) - 1) * 100) + "%",
        ),
        K(
          "Tasso periodale i(" + m + ")",
          f4(((1 + i) ** (1 / m) - 1) * 100) + "%",
        ),
        K("Tasso di sconto d", f4((i / (1 + i)) * 100) + "%"),
        K("Intensità δ", f4(dl * 100) + "%"),
        K("Fattore di sconto v", f4(1 / (1 + i))),
      ]) +
      `<p class="note">Tassi equivalenti: producono lo stesso montante in un anno. Al crescere di m il nominale j(m) tende a δ = ln(1+i).</p>` +
      TB(
        ["m", "Tasso periodale", "Nominale j(m)"],
        ms.map((k) => [
          k,
          f4(((1 + i) ** (1 / k) - 1) * 100) + "%",
          f4(k * ((1 + i) ** (1 / k) - 1) * 100) + "%",
        ]),
      ) +
      plot({
        t: "Nominale j(m) al crescere di m",
        xs: m2,
        lines: [
          {
            n: "j(m)",
            c: PAL[0],
            a: 1,
            v: m2.map((k) => k * ((1 + i) ** (1 / k) - 1) * 100),
          },
          {
            n: "δ (limite)",
            c: PAL[1],
            d: "5 4",
            v: m2.map(() => dl * 100),
          },
        ],
        yf: (q) => f4(q) + "%",
        lb: m2.map((k) => "m = " + k),
      })
    );
  },
};
