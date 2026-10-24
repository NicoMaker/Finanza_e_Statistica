// Sezione «Statistica (varianza/covarianza)»: formule (FM.vc) e calcolatore (T.vc)
FM.vc = eq(
  `<b>Medie</b><i>μ</i><sub>X</sub> = ${fr("Σ <i>x</i><sub>k</sub>", "<i>n</i>")} , &nbsp;<i>μ</i><sub>Y</sub> = ${fr("Σ <i>y</i><sub>k</sub>", "<i>n</i>")}`,
  `<b>Varianza</b><i>σ</i><sub>X</sub><sup>2</sup> = ${fr("Σ (<i>x</i><sub>k</sub> − <i>μ</i><sub>X</sub>)<sup>2</sup>", "<i>n</i>")} &nbsp;(popolazione) , &nbsp;<i>s</i><sub>X</sub><sup>2</sup> = ${fr("Σ (<i>x</i><sub>k</sub> − <i>μ</i><sub>X</sub>)<sup>2</sup>", "<i>n</i> − 1")} &nbsp;(campionaria)`,
  `<b>Covarianza</b><i>σ</i><sub>XY</sub> = ${fr("Σ (<i>x</i><sub>k</sub> − <i>μ</i><sub>X</sub>)(<i>y</i><sub>k</sub> − <i>μ</i><sub>Y</sub>)", "<i>n</i>")} = <i>E</i>[<i>XY</i>] − <i>μ</i><sub>X</sub>·<i>μ</i><sub>Y</sub>`,
  `<b>Correlazione</b><i>ρ</i> = ${fr("<i>σ</i><sub>XY</sub>", "<i>σ</i><sub>X</sub>·<i>σ</i><sub>Y</sub>")} , &nbsp;−1 ≤ <i>ρ</i> ≤ 1`,
  `<b>Regressione</b><i>y</i> = <i>a</i> + <i>b</i>·<i>x</i> , &nbsp;<i>b</i> = ${fr("<i>σ</i><sub>XY</sub>", "<i>σ</i><sub>X</sub><sup>2</sup>")} , &nbsp;<i>a</i> = <i>μ</i><sub>Y</sub> − <i>b</i>·<i>μ</i><sub>X</sub>`,
  `<b>Portafoglio</b><i>σ</i><sub>P</sub><sup>2</sup> = <i>w</i><sup>2</sup><i>σ</i><sub>X</sub><sup>2</sup> + (1−<i>w</i>)<sup>2</sup><i>σ</i><sub>Y</sub><sup>2</sup> + 2<i>w</i>(1−<i>w</i>)<i>σ</i><sub>XY</sub> , &nbsp;<i>w</i>* = ${fr("<i>σ</i><sub>Y</sub><sup>2</sup> − <i>σ</i><sub>XY</sub>", "<i>σ</i><sub>X</sub><sup>2</sup> + <i>σ</i><sub>Y</sub><sup>2</sup> − 2<i>σ</i><sub>XY</sub>")}`,
);
