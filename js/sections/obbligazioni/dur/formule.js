// Sezione «Duration e convessità»: formule (FM.dur) e calcolatore (T.dur)
FM.dur = eq(
  `<b>Prezzo</b><i>P</i> = Σ<sub>t</sub> <i>F</i><sub>t</sub>·<i>v</i><sup>t</sup>`,
  `<b>Duration</b><i>D</i> = ${fr("Σ<sub>t</sub> <i>t</i>·<i>F</i><sub>t</sub>·<i>v</i><sup>t</sup>", "Σ<sub>t</sub> <i>F</i><sub>t</sub>·<i>v</i><sup>t</sup>")} , &nbsp;<i>D</i><sup>*</sup> = ${fr("<i>D</i>", "1+<i>i</i>")}`,
  `<b>Convessità</b><i>C</i> = ${fr("Σ<sub>t</sub> <i>t</i>(<i>t</i>+1)·<i>F</i><sub>t</sub>·<i>v</i><sup>t+2</sup>", "<i>P</i>")}`,
  `<b>Variazione</b>${fr("Δ<i>P</i>", "<i>P</i>")} ≈ −<i>D</i><sup>*</sup>·Δ<i>i</i> + ½·<i>C</i>·Δ<i>i</i><sup>2</sup>`,
);
