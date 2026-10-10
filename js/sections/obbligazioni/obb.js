// Sezione «Obbligazioni»: formule (FM.obb) e calcolatore (T.obb)
FM.obb = eq(
  `<b>Prezzo</b><i>P</i> = Σ<sub>k</sub> ${fr("<i>c</i>·<i>F</i>", "<i>f</i>")}(1+<i>y</i>)<sup>−k/f</sup> + <i>F</i>(1+<i>y</i>)<sup>−n</sup>`,
  `<b>Rendimento</b>trova <i>y</i> tale che <i>P</i>(<i>y</i>) = prezzo di mercato`,
  `<b>Current yield</b>${fr("<i>c</i>·<i>F</i>", "<i>P</i>")} , &nbsp;<b>Zero coupon</b><i>y</i> = (<i>F</i>/<i>P</i>)<sup>1/n</sup> − 1`,
);
T.obb = {
  n: "Obbligazioni",
  s: "B",
  fm: FM.obb,
  f: [
    {
      k: "m",
      l: "Cosa calcolare",
      t: "s",
      o: [
        ["p", "Prezzo dal rendimento"],
        ["y", "Rendimento (YTM) dal prezzo"],
      ],
      v: "p",
    },
    { k: "F", l: "Valore nominale (€)", v: 1000 },
    { k: "c", l: "Cedola annua (%)", v: 4 },
    { k: "n", l: "Scadenza (anni)", v: 5 },
    { k: "f", l: "Cedole all’anno", v: 1 },
    {
      k: "y",
      l: "Rendimento annuo effettivo (%)",
      v: 3,
      s: (v) => v.m == "p",
    },
    {
      k: "P",
      l: "Prezzo di mercato (€)",
      v: 1050,
      s: (v) => v.m == "y",
    },
  ],
  c(v) {
    const f = Math.round(v.f),
      N = Math.round(v.n * f),
      F = v.F,
      cf = (F * v.c) / 100 / f;
    if (!(f >= 1) || !(N >= 1 && N <= 2000))
      return ER("Scadenza o frequenza non valide.");
    const pr = (y) => {
      let s = 0;
      for (let k = 1; k <= N; k++)
        s += (cf + (k == N ? F : 0)) * (1 + y) ** (-k / f);
      return s;
    };
    let Y, P;
    if (v.m == "p") {
      Y = v.y / 100;
      P = pr(Y);
    } else {
      P = v.P;
      let lo = -0.99,
        hi = 10;
      if (!(P > 0) || !(pr(lo) >= P) || !(pr(hi) <= P))
        return ER("Rendimento non trovato per questo prezzo.");
      for (let q = 0; q < 120; q++) {
        const mid = (lo + hi) / 2;
        pr(mid) > P ? (lo = mid) : (hi = mid);
      }
      Y = (lo + hi) / 2;
    }
    const a = Math.max(-0.02, Y - 0.06),
      b = Y + 0.06,
      ys = [...Array(41)].map((_, j) => a + ((b - a) * j) / 40);
    return (
      ks([
        K("Prezzo", f2(P), 1),
        K("Rendimento effettivo annuo", f4(Y * 100) + "%"),
        K(
          "Rendimento nominale annuo",
          f4(f * ((1 + Y) ** (1 / f) - 1) * 100) + "%",
        ),
        K("Current yield", f4(((F * v.c) / 100 / P) * 100) + "%"),
        K(
          P > F
            ? "Premio sul nominale"
            : P < F
              ? "Sconto sul nominale"
              : "Alla pari",
          f2(P - F),
        ),
        K("Cedole totali", f2(cf * N)),
      ]) +
      `<p class="note">${P > F ? "Prezzo sopra la pari: cedola maggiore del rendimento." : P < F ? "Prezzo sotto la pari: cedola minore del rendimento." : "Prezzo alla pari: rendimento uguale alla cedola."} Flussi: ${N} cedole da ${f2(cf)}${N > 0 ? ", rimborso di " + f2(F) + " in coda" : ""}.</p>` +
      plot({
        t: "Prezzo in funzione del rendimento",
        xs: ys.map((y) => y * 100),
        lines: [{ n: "Prezzo", c: PAL[0], a: 1, v: ys.map(pr) }],
        marks: [
          {
            x: Y * 100,
            y: P,
            c: PAL[3],
            l: "Prezzo " + f2(P) + " a " + f2(Y * 100) + "%",
          },
        ],
        xf: (x) => f2(x) + "%",
        lb: ys.map((y) => "Rendimento " + f2(y * 100) + "%"),
      })
    );
  },
};
