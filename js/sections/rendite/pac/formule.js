// Sezione «Piani di accumulo»: formule (FM.pac) e calcolatore (T.pac)
FM.pac = eq(
  `<b>Montante</b><i>M</i> = <i>C</i><sub>0</sub>(1+<i>i</i>)<sup>N</sup> + <i>R</i>·<i>s</i><sub>N⌉i</sub> &nbsp;(anticipati: ×(1+<i>i</i>) sulle rate)`,
  `<b>Versamento</b><i>R</i> = ${fr("<i>G</i> − <i>C</i><sub>0</sub>(1+<i>i</i>)<sup>N</sup>", "<i>u</i>·<i>s</i><sub>N⌉i</sub>")}`,
  `<b>Tempo</b><i>N</i> = ${fr("ln[(<i>G</i>·<i>i</i> + <i>R</i>·<i>u</i>) / (<i>C</i><sub>0</sub>·<i>i</i> + <i>R</i>·<i>u</i>)]", "ln(1+<i>i</i>)")} , &nbsp;<i>u</i> = 1 (posticipati) o 1+<i>i</i> (anticipati)`,
);
