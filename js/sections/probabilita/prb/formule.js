// Sezione «Probabilità»: tutti i casi (classica, eventi, Bayes, binomiale, ipergeometrica, lotterie,
// geometrica, Poisson, urne con/senza reinserimento, dadi, valore atteso, normale): FM.prb e T.prb
FM.prb = eq(
  `<b>Probabilità classica</b><i>P</i>(<i>A</i>) = ${fr("casi favorevoli", "casi possibili")} , &nbsp;<i>P</i>(<i>Ā</i>) = 1 − <i>P</i>(<i>A</i>) , &nbsp;0 ≤ <i>P</i> ≤ 1`,
  `<b>Unione</b><i>P</i>(<i>A</i>∪<i>B</i>) = <i>P</i>(<i>A</i>) + <i>P</i>(<i>B</i>) − <i>P</i>(<i>A</i>∩<i>B</i>) &nbsp;(incompatibili: <i>P</i>(<i>A</i>∩<i>B</i>) = 0)`,
  `<b>Intersezione</b><i>P</i>(<i>A</i>∩<i>B</i>) = <i>P</i>(<i>A</i>)·<i>P</i>(<i>B</i>|<i>A</i>) &nbsp;(indipendenti: <i>P</i>(<i>A</i>)·<i>P</i>(<i>B</i>))`,
  `<b>Condizionata</b><i>P</i>(<i>A</i>|<i>B</i>) = ${fr("<i>P</i>(<i>A</i>∩<i>B</i>)", "<i>P</i>(<i>B</i>)")}`,
  `<b>Probabilità totali e Bayes</b><i>P</i>(<i>E</i>) = Σ <i>P</i>(<i>H</i><sub>i</sub>)·<i>P</i>(<i>E</i>|<i>H</i><sub>i</sub>) , &nbsp;<i>P</i>(<i>H</i><sub>i</sub>|<i>E</i>) = ${fr("<i>P</i>(<i>H</i><sub>i</sub>)·<i>P</i>(<i>E</i>|<i>H</i><sub>i</sub>)", "<i>P</i>(<i>E</i>)")}`,
  `<b>Binomiale</b>(con reinserimento) <i>P</i>(<i>X</i>=<i>k</i>) = <i>C</i><sub>n,k</sub>·<i>p</i><sup>k</sup>(1−<i>p</i>)<sup>n−k</sup> , &nbsp;<i>E</i> = <i>np</i> , &nbsp;<i>σ</i><sup>2</sup> = <i>np</i>(1−<i>p</i>)`,
  `<b>Ipergeometrica</b>(senza reinserimento) <i>P</i>(<i>X</i>=<i>k</i>) = ${fr("<i>C</i><sub>K,k</sub>·<i>C</i><sub>N−K,n−k</sub>", "<i>C</i><sub>N,n</sub>")} , &nbsp;<i>E</i> = <i>n</i>·${fr("K", "N")}`,
  `<b>Geometrica</b><i>P</i>(<i>X</i>=<i>k</i>) = (1−<i>p</i>)<sup>k−1</sup>·<i>p</i> , &nbsp;<i>E</i> = 1/<i>p</i> &nbsp;(primo successo alla prova <i>k</i>)`,
  `<b>Poisson</b><i>P</i>(<i>X</i>=<i>k</i>) = e<sup>−λ</sup>·${fr("<i>λ</i><sup>k</sup>", "<i>k</i>!")} , &nbsp;<i>E</i> = <i>σ</i><sup>2</sup> = <i>λ</i>`,
  `<b>Urna, composizione data</b>senza reinserimento ${fr("∏ <i>C</i><sub>n<sub>i</sub>,k<sub>i</sub></sub>", "<i>C</i><sub>N,m</sub>")} , &nbsp;con reinserimento ${fr("<i>m</i>!", "∏ <i>k</i><sub>i</sub>!")}·∏ (${fr("<i>n</i><sub>i</sub>", "<i>N</i>")})<sup>k<sub>i</sub></sup>`,
  `<b>Dadi</b>somma di <i>n</i> dadi a <i>f</i> facce: <i>f</i><sup>n</sup> casi possibili, ciascuno con probabilità 1/<i>f</i><sup>n</sup>`,
  `<b>Valore atteso</b><i>E</i>[<i>X</i>] = Σ <i>x</i><sub>i</sub><i>p</i><sub>i</sub> , &nbsp;<i>σ</i><sup>2</sup> = <i>E</i>[<i>X</i><sup>2</sup>] − <i>E</i>[<i>X</i>]<sup>2</sup>`,
  `<b>Normale</b><i>z</i> = ${fr("<i>x</i> − <i>μ</i>", "<i>σ</i>")} , &nbsp;<i>P</i>(<i>X</i> ≤ <i>x</i>) = Φ(<i>z</i>) = ½[1 + erf(<i>z</i>/√2)]`,
);
