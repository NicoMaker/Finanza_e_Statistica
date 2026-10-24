// Sezione «Flusso generico»: formule (FM.flu) e calcolatore (T.flu)
FM.flu = eq(
  `<b>Duration</b><i>D</i> = ${fr("Σ <i>F</i>·<i>v</i>(<i>t</i>)·<i>t</i>", "Σ <i>F</i>·<i>v</i>(<i>t</i>)")} , &nbsp;<b>Scadenza media</b>${fr("Σ <i>F</i>·<i>t</i>", "Σ <i>F</i>")}`,
  `<b>In t*</b><i>D</i>(<i>t*</i>) = <i>t*</i> + ${fr("Σ <i>F</i>·(<i>t</i>−<i>t*</i>)·<i>v</i>(<i>t</i>−<i>t*</i>)", "Σ <i>F</i>·<i>v</i>(<i>t</i>−<i>t*</i>)")}`,
  `<b>Prezzo</b>Δ<i>P</i> ≈ −${fr("<i>D</i>·<i>P</i>·Δ<i>r</i>", "1+<i>r</i>")}`,
);
