// Formule mostrate nella scheda «Polinomio di McLaurin»
FM.mac = eq(
  `<b>Taylor</b><i>T</i><sub>n</sub>(<i>x</i>) = Σ<sub>k=0..n</sub> ${fr("<i>f</i><sup>(k)</sup>(<i>a</i>)", "<i>k</i>!")}·(<i>x</i>−<i>a</i>)<sup>k</sup>`,
  `<b>McLaurin</b>(<i>a</i> = 0) <i>P</i><sub>n</sub>(<i>x</i>) = Σ<sub>k=0..n</sub> ${fr("<i>f</i><sup>(k)</sup>(0)", "<i>k</i>!")}·<i>x</i><sup>k</sup> = <i>f</i>(0) + <i>f</i>′(0)·<i>x</i> + ${fr("<i>f</i>″(0)", "2!")}·<i>x</i><sup>2</sup> + … + ${fr("<i>f</i><sup>(n)</sup>(0)", "<i>n</i>!")}·<i>x</i><sup>n</sup>`,
  `<b>Resto</b><i>R</i><sub>n</sub>(<i>x</i>) = <i>f</i>(<i>x</i>) − <i>P</i><sub>n</sub>(<i>x</i>) = ${fr("<i>f</i><sup>(n+1)</sup>(ξ)", "(<i>n</i>+1)!")}·<i>x</i><sup>n+1</sup>, con ξ tra 0 e <i>x</i>`,
  `<b>eˣ</b><i>e</i><sup>x</sup> = Σ<sub>k≥0</sub> ${fr("<i>x</i><sup>k</sup>", "<i>k</i>!")} = 1 + <i>x</i> + ${fr("<i>x</i><sup>2</sup>", "2!")} + ${fr("<i>x</i><sup>3</sup>", "3!")} + …`,
  `<b>sin x</b>sin <i>x</i> = Σ<sub>k≥0</sub> (−1)<sup>k</sup> ${fr("<i>x</i><sup>2k+1</sup>", "(2<i>k</i>+1)!")} = <i>x</i> − ${fr("<i>x</i><sup>3</sup>", "3!")} + ${fr("<i>x</i><sup>5</sup>", "5!")} − …`,
  `<b>cos x</b>cos <i>x</i> = Σ<sub>k≥0</sub> (−1)<sup>k</sup> ${fr("<i>x</i><sup>2k</sup>", "(2<i>k</i>)!")} = 1 − ${fr("<i>x</i><sup>2</sup>", "2!")} + ${fr("<i>x</i><sup>4</sup>", "4!")} − …`,
  `<b>ln(1+x)</b>ln(1+<i>x</i>) = Σ<sub>k≥1</sub> (−1)<sup>k+1</sup> ${fr("<i>x</i><sup>k</sup>", "<i>k</i>")} = <i>x</i> − ${fr("<i>x</i><sup>2</sup>", "2")} + ${fr("<i>x</i><sup>3</sup>", "3")} − …, per −1 &lt; <i>x</i> ≤ 1`,
  `<b>1/(1−x)</b>${fr("1", "1−<i>x</i>")} = Σ<sub>k≥0</sub> <i>x</i><sup>k</sup> = 1 + <i>x</i> + <i>x</i><sup>2</sup> + …, per |<i>x</i>| &lt; 1`,
  `<b>(1+x)<sup>α</sup></b>(1+<i>x</i>)<sup>α</sup> = Σ<sub>k≥0</sub> C(α, <i>k</i>)·<i>x</i><sup>k</sup>, con C(α, <i>k</i>) = ${fr("α(α−1)…(α−<i>k</i>+1)", "<i>k</i>!")}, per |<i>x</i>| &lt; 1`,
);
