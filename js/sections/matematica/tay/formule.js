FM.tay = eq(
  `<b>Serie</b><i>f</i>(<i>x</i>) ≈ <i>T</i><sub>n</sub>(<i>x</i>) = Σ<sub>k=0..n</sub> ${fr("<i>f</i><sup>(k)</sup>(<i>a</i>)", "<i>k</i>!")}·(<i>x</i>−<i>a</i>)<sup>k</sup>`,
  `<b>Resto</b><i>R</i><sub>n</sub> = <i>f</i>(<i>x</i>) − <i>T</i><sub>n</sub>(<i>x</i>) ≈ ${fr("<i>f</i><sup>(n+1)</sup>(ξ)", "(<i>n</i>+1)!")}·(<i>x</i>−<i>a</i>)<sup>n+1</sup>`,
);
