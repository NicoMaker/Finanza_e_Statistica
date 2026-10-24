// Sezione «Regimi e sconto»: formule (FM.reg) e calcolatore (T.reg)
FM.reg = eq(
  `<b>Semplice</b><i>M</i> = <i>C</i>(1+<i>it</i>) , &nbsp;<b>Sconto razionale</b><i>V</i> = ${fr("<i>M</i>", "1+<i>it</i>")}`,
  `<b>Composto</b><i>M</i> = <i>C</i>(1+<i>i</i>)<sup>t</sup> , &nbsp;<i>V</i> = <i>M</i>(1+<i>i</i>)<sup>−t</sup>`,
  `<b>Commerciale</b><i>V</i> = <i>M</i>(1 − <i>dt</i>) , &nbsp;<i>D</i> = <i>M</i>·<i>d</i>·<i>t</i>`,
  `<b>Equivalenza</b><i>d</i> = ${fr("<i>i</i>", "1+<i>i</i>·<i>t</i>")} &nbsp;(stesso valore attuale a scadenza <i>t</i>)`,
);
