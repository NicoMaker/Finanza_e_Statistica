// Sezione «Inflazione e imposte»: formule (FM.inf) e calcolatore (T.inf)
FM.inf = eq(
  `<b>Fisher</b>1 + <i>i</i> = (1 + <i>r</i>)(1 + <i>π</i>) , &nbsp;<i>r</i> = ${fr("<i>i</i> − <i>π</i>", "1 + <i>π</i>")} ≈ <i>i</i> − <i>π</i>`,
  `<b>Netto imposta</b><i>i</i><sub>n</sub> = <i>i</i>(1 − <i>τ</i>)`,
  `<b>Potere d’acquisto</b><i>M</i><sub>reale</sub> = <i>M</i>(1+<i>π</i>)<sup>−t</sup>`,
);
