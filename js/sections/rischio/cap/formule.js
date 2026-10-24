// Sezione «CAPM e rischio»: formule (FM.cap) e calcolatore (T.cap)
FM.cap = eq(
  `<b>CAPM</b><i>E</i>[<i>R</i>] = <i>r</i><sub>f</sub> + <i>β</i>(<i>r</i><sub>m</sub> − <i>r</i><sub>f</sub>)`,
  `<b>Sharpe</b>${fr("<i>R</i><sub>p</sub> − <i>r</i><sub>f</sub>", "<i>σ</i><sub>p</sub>")} , &nbsp;<b>Treynor</b>${fr("<i>R</i><sub>p</sub> − <i>r</i><sub>f</sub>", "<i>β</i>")}`,
  `<b>Alpha di Jensen</b><i>α</i> = <i>R</i><sub>p</sub> − [<i>r</i><sub>f</sub> + <i>β</i>(<i>r</i><sub>m</sub> − <i>r</i><sub>f</sub>)]`,
  `<b>Beta</b><i>β</i> = ${fr("<i>σ</i><sub>iM</sub>", "<i>σ</i><sub>M</sub><sup>2</sup>")}`,
);
