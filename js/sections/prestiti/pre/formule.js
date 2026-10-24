// Sezione «Prestiti»: formule (FM.pre) e calcolatore (T.pre)
FM.pre = eq(
  `<b>Rata</b><i>R</i> = ${fr("<i>C</i>·<i>i</i>", "1 − (1+<i>i</i>)<sup>−n</sup>")} , &nbsp;<i>i</i> = ${fr("TAN", "12")}`,
  `<b>TAEG</b>(1+<i>j</i>)<sup>12</sup> − 1 &nbsp;con&nbsp; Σ<sub>k=1…n</sub> (<i>R</i>+<i>s</i>)(1+<i>j</i>)<sup>−k</sup> = <i>C</i> − <i>e</i>`,
  `<b>Sostenibilità</b>${fr("<i>R</i>", "reddito netto")} ≤ ${fr("1", "3")}`,
  `<b>Tasso variabile</b><i>R′</i> = ${fr("<i>D</i><sub>k</sub>·<i>i′</i>", "1 − (1+<i>i′</i>)<sup>−(n−k)</sup>")}`,
);
