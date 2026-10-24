// Sezione «Opzioni (Black-Scholes)»: formule (FM.opz) e calcolatore (T.opz)
FM.opz = eq(
  `<b>Call</b><i>C</i> = <i>S</i>e<sup>−qT</sup><i>N</i>(<i>d</i><sub>1</sub>) − <i>K</i>e<sup>−rT</sup><i>N</i>(<i>d</i><sub>2</sub>)`,
  `<b>Put</b><i>P</i> = <i>K</i>e<sup>−rT</sup><i>N</i>(−<i>d</i><sub>2</sub>) − <i>S</i>e<sup>−qT</sup><i>N</i>(−<i>d</i><sub>1</sub>)`,
  `<b>d</b><sub>1</sub> = ${fr("ln(<i>S</i>/<i>K</i>) + (<i>r</i> − <i>q</i> + <i>σ</i><sup>2</sup>/2)<i>T</i>", "<i>σ</i>√<i>T</i>")} , &nbsp;<i>d</i><sub>2</sub> = <i>d</i><sub>1</sub> − <i>σ</i>√<i>T</i>`,
  `<b>Parità put-call</b><i>C</i> − <i>P</i> = <i>S</i>e<sup>−qT</sup> − <i>K</i>e<sup>−rT</sup>`,
);
