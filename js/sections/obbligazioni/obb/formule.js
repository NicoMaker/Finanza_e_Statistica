// Sezione «Obbligazioni»: formule (FM.obb) e calcolatore (T.obb)
FM.obb = eq(
  `<b>Prezzo</b><i>P</i> = Σ<sub>k</sub> ${fr("<i>c</i>·<i>F</i>", "<i>f</i>")}(1+<i>y</i>)<sup>−k/f</sup> + <i>F</i>(1+<i>y</i>)<sup>−n</sup>`,
  `<b>Rendimento</b>trova <i>y</i> tale che <i>P</i>(<i>y</i>) = prezzo di mercato`,
  `<b>Current yield</b>${fr("<i>c</i>·<i>F</i>", "<i>P</i>")} , &nbsp;<b>Zero coupon</b><i>y</i> = (<i>F</i>/<i>P</i>)<sup>1/n</sup> − 1`,
);
