// Sezione «Rendite»: formule (FM.ren) e calcolatore (T.ren)
FM.ren = eq(
  `<b>Perpetua</b><i>V</i> = ${fr("<i>R</i>", "<i>i</i>")}`,
  `<b>Gordon</b><i>V</i> = ${fr("<i>R</i>", "<i>i</i> − <i>g</i>")} &nbsp;(<i>i</i> &gt; <i>g</i>)`,
  `<b>Differita</b><i>V</i> = <i>R</i>·<i>a</i><sub>n⌉i</sub>·(1+<i>i</i>)<sup>−s</sup>`,
  `<b>Aritmetica</b><i>V</i> = (<i>R</i> + ${fr("<i>D</i>", "<i>i</i>")})<i>a</i><sub>n⌉i</sub> − ${fr("<i>D</i>·<i>n</i>·<i>v</i><sup>n</sup>", "<i>i</i>")}`,
  `<b>Geometrica</b><i>V</i> = <i>R</i> ${fr("1 − ((1+<i>g</i>)/(1+<i>i</i>))<sup>n</sup>", "<i>i</i> − <i>g</i>")}`,
);
