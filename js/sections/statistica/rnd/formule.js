// Sezione «Rendimenti e volatilità»: formule (FM.rnd) e calcolatore (T.rnd)
FM.rnd = eq(
  `<b>Rendimento</b><i>r</i><sub>k</sub> = ${fr("<i>P</i><sub>k</sub>", "<i>P</i><sub>k−1</sub>")} − 1`,
  `<b>CAGR</b>(<i>P</i><sub>n</sub> / <i>P</i><sub>0</sub>)<sup>f/n</sup> − 1 &nbsp;(<i>f</i> periodi all’anno)`,
  `<b>Volatilità annua</b><i>σ</i><sub>a</sub> = <i>σ</i>·√<i>f</i> , &nbsp;<b>VaR</b> = <i>z</i>·<i>σ</i> − <i>μ</i>`,
  `<b>Drawdown</b><i>DD</i><sub>k</sub> = ${fr("<i>P</i><sub>k</sub>", "max<sub>j≤k</sub> <i>P</i><sub>j</sub>")} − 1`,
);
