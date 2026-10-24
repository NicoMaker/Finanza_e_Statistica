// Sezione «Valore attuale e montante»: formule (FM.val) e calcolatore (T.val)
FM.val = eq(
  `<b>Somma</b><i>M</i> = <i>C</i>(1+<i>i</i>)<sup>n</sup> , &nbsp;<i>V</i> = <i>M</i>(1+<i>i</i>)<sup>−n</sup>`,
  `<b>Posticipata</b><i>V</i> = <i>R</i>·<i>a</i><sub>n⌉i</sub> = <i>R</i> ${fr("1 − <i>v</i><sup>n</sup>", "<i>i</i>")} , &nbsp;<i>M</i> = <i>R</i>·<i>s</i><sub>n⌉i</sub> = <i>R</i> ${fr("(1+<i>i</i>)<sup>n</sup> − 1", "<i>i</i>")}`,
  `<b>Anticipata</b><i>ä</i><sub>n⌉i</sub> = (1+<i>i</i>)·<i>a</i><sub>n⌉i</sub> , &nbsp;<i>s̈</i><sub>n⌉i</sub> = (1+<i>i</i>)·<i>s</i><sub>n⌉i</sub>`,
  `<b>Rate variabili</b><i>V</i> = Σ<sub>k</sub> <i>R</i><sub>k</sub>·<i>v</i><sup>k</sup> , &nbsp;<i>M</i> = <i>V</i>(1+<i>i</i>)<sup>n</sup>`,
);
