// Sezione «Tasso patrimoniale»: crescita del patrimonio con versamenti, imposte e inflazione
FM.pat = eq(
  `<b>Patrimonio</b><i>W</i><sub>t</sub> = <i>W</i><sub>t−1</sub>·(1+<i>r</i><sub>n</sub>) + <i>V</i>`,
  `<b>Tasso netto</b><i>r</i><sub>n</sub> = <i>r</i>·(1−<i>τ</i>)`,
  `<b>Tasso reale</b><i>r</i><sub>r</sub> = ${fr("1+<i>r</i><sub>n</sub>", "1+<i>π</i>")} − 1`,
  `<b>Tasso patrimoniale</b><i>g</i> = (${fr("<i>W</i><sub>n</sub>", "<i>W</i><sub>0</sub>")})<sup>1/n</sup> − 1 , &nbsp;raddoppio = ${fr("ln 2", "ln(1+<i>r</i><sub>n</sub>)")}`,
);
