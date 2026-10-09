// Sezione «Inflazione e imposte»: formule (FM.inf) e calcolatore (T.inf)
FM.inf = eq(
  `<b>Fisher</b>1 + <i>i</i> = (1 + <i>r</i>)(1 + <i>π</i>) , &nbsp;<i>r</i> = ${fr("<i>i</i> − <i>π</i>", "1 + <i>π</i>")} ≈ <i>i</i> − <i>π</i>`,
  `<b>Netto imposta</b><i>i</i><sub>n</sub> = <i>i</i>(1 − <i>τ</i>)`,
  `<b>Potere d’acquisto</b><i>M</i><sub>reale</sub> = <i>M</i>(1+<i>π</i>)<sup>−t</sup>`,
);
T.inf = {
  n: "Inflazione e tassi reali",
  s: "π",
  fm: FM.inf,
  f: [
    { k: "C", l: "Capitale (€)", v: 10000 },
    { k: "i", l: "Tasso nominale annuo (%)", v: 3 },
    { k: "p", l: "Inflazione annua (%)", v: 2 },
    { k: "t", l: "Durata (anni)", v: 10 },
    { k: "tau", l: "Imposta sugli interessi (%)", v: 26 },
  ],
  c(v) {
    const C = v.C,
      i = v.i / 100,
      p = v.p / 100,
      tau = v.tau / 100,
      t = v.t;
    if (i <= -1 || p <= -1 || !(t >= 0)) return ER("Dati non validi.");
    const iN = i * (1 - tau),
      xs = [...Array(41)].map((_, j) => ((t || 1) * j) / 40),
      Ml = C * (1 + i) ** t,
      Mn = C * (1 + iN) ** t;
    return (
      ks([
        K("Tasso reale (Fisher)", f4(((1 + i) / (1 + p) - 1) * 100) + "%", 1),
        K("Tasso reale approssimato i − π", f4((i - p) * 100) + "%"),
        K("Tasso netto d’imposta", f4(iN * 100) + "%"),
        K("Tasso reale netto", f4(((1 + iN) / (1 + p) - 1) * 100) + "%"),
        K("Montante lordo", f2(Ml)),
        K("Montante netto", f2(Mn)),
        K("Valore reale del netto", f2(Mn / (1 + p) ** t)),
        K("Capitale per tenere il potere d’acquisto", f2(C * (1 + p) ** t)),
      ]) +
      `<p class="note">L’imposta è applicata al tasso annuo (semplificazione). Se il tasso reale netto è negativo, il capitale perde potere d’acquisto.</p>` +
      plot({
        t: "Montante e potere d’acquisto",
        xs,
        zero: 1,
        lines: [
          {
            n: "Montante lordo",
            c: PAL[0],
            v: xs.map((x) => C * (1 + i) ** x),
          },
          {
            n: "Montante netto",
            c: PAL[2],
            a: 1,
            v: xs.map((x) => C * (1 + iN) ** x),
          },
          {
            n: "Valore reale del netto",
            c: PAL[1],
            v: xs.map((x) => C * ((1 + iN) / (1 + p)) ** x),
          },
          {
            n: "Capitale per il potere d’acquisto",
            c: PAL[3],
            d: "5 4",
            v: xs.map((x) => C * (1 + p) ** x),
          },
        ],
        lb: xs.map((x) => "t = " + sh(x)),
      })
    );
  },
};
