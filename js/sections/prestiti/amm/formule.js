// Sezione «Ammortamento»: formule (FM.amm) e calcolatore (T.amm)
FM.amm = eq(
  `<b>Francese</b><i>R</i> = ${fr("<i>C</i>·<i>i</i>", "1 − <i>v</i><sup>n</sup>")} = ${fr("<i>C</i>", "<i>a</i><sub>n⌉i</sub>")} , &nbsp;<i>I</i><sub>k</sub> = <i>i</i>·<i>D</i><sub>k−1</sub> , &nbsp;<i>C</i><sub>k</sub> = <i>R</i> − <i>I</i><sub>k</sub>`,
  `<b>Italiano</b><i>C</i><sub>k</sub> = ${fr("<i>C</i>", "<i>n</i>")} , &nbsp;<i>I</i><sub>k</sub> = <i>i</i>·<i>D</i><sub>k−1</sub> , &nbsp;<i>R</i><sub>k</sub> = <i>C</i><sub>k</sub> + <i>I</i><sub>k</sub>`,
  `<b>Tedesco</b><i>R</i> = ${fr("<i>C</i>·<i>d</i>", "1 − (1−<i>d</i>)<sup>n</sup>")} , &nbsp;<i>d</i> = ${fr("<i>i</i>", "1+<i>i</i>")} &nbsp;(interessi anticipati)`,
  `<b>Americano</b><i>R</i><sub>k</sub> = <i>C</i>·<i>i</i> (<i>k</i> &lt; <i>n</i>) , &nbsp;<i>R</i><sub>n</sub> = <i>C</i>·<i>i</i> + <i>C</i>`,
  `<b>Ricostituzione</b><i>s</i> = ${fr("<i>C</i>·<i>i′</i>", "(1+<i>i′</i>)<sup>n</sup> − 1")} = ${fr("<i>C</i>", "<i>s</i><sub>n⌉i′</sub>")} , &nbsp;<i>F</i><sub>k</sub> = <i>F</i><sub>k−1</sub>(1+<i>i′</i>) + <i>s</i> , &nbsp;<i>F</i><sub>n</sub> = <i>C</i> , &nbsp;esborso = <i>C</i>·<i>i</i> + <i>s</i>`,
  `<b>Patrimonio</b><i>A</i><sub>k</sub> = <i>V</i>·(1+<i>g</i>)<sup>k/m</sup> , &nbsp;<i>PN</i><sub>k</sub> = <i>A</i><sub>k</sub> − <i>D</i><sub>k</sub> , &nbsp;LTV<sub>k</sub> = ${fr("<i>D</i><sub>k</sub>", "<i>A</i><sub>k</sub>")} (<i>V</i> valore del bene, <i>g</i> rivalutazione annua, <i>D</i><sub>k</sub> debito residuo)`,
  `<b>Tasso del periodo</b><i>i</i><sub>m</sub> = (1+<i>i</i>)<sup>1/m</sup> − 1 , &nbsp;<i>v</i> = (1+<i>i</i>)<sup>−1</sup>`,
);
