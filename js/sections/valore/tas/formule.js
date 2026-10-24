// Sezione «Tassi e conversioni»: formule (FM.tas) e calcolatore (T.tas)
FM.tas = eq(
  `<b>Effettivo ↔ nominale</b><i>i</i> = (1 + ${fr("<i>j</i><sub>m</sub>", "<i>m</i>")})<sup>m</sup> − 1 , &nbsp;<i>j</i><sub>m</sub> = <i>m</i>[(1+<i>i</i>)<sup>1/m</sup> − 1]`,
  `<b>Sconto</b><i>d</i> = ${fr("<i>i</i>", "1+<i>i</i>")} , &nbsp;<i>i</i> = ${fr("<i>d</i>", "1−<i>d</i>")} , &nbsp;<i>v</i> = 1 − <i>d</i>`,
  `<b>Intensità</b><i>δ</i> = ln(1+<i>i</i>) = lim<sub>m→∞</sub> <i>j</i><sub>m</sub>`,
);
