// Sezione «VAN e TIR»: formule (FM.npv) e calcolatore (T.npv)
FM.npv = eq(
  `<b>VAN</b><i>VAN</i>(<i>r</i>) = Σ<sub>t=0…n</sub> <i>F</i><sub>t</sub>(1+<i>r</i>)<sup>−t</sup>`,
  `<b>TIR</b>trova <i>r*</i> tale che <i>VAN</i>(<i>r*</i>) = 0`,
  `<b>Criterio</b><i>VAN</i> &gt; 0 ⇒ il progetto crea valore ; &nbsp;<i>r*</i> &gt; <i>r</i> ⇒ accettabile`,
);
