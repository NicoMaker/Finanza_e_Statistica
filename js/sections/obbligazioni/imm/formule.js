// Sezione «Immunizzazione finanziaria»: portafoglio di due zero coupon (Redington)
FM.imm = eq(
  `<b>Valore attuale</b><i>P</i> = ${fr("<i>L</i>", "(1+<i>i</i>)<sup>H</sup>")}`,
  `<b>Duration pari</b><i>w</i><sub>1</sub>·<i>T</i><sub>1</sub> + <i>w</i><sub>2</sub>·<i>T</i><sub>2</sub> = <i>H</i> , &nbsp;<i>w</i><sub>1</sub> = ${fr("<i>T</i><sub>2</sub>−<i>H</i>", "<i>T</i><sub>2</sub>−<i>T</i><sub>1</sub>")}`,
  `<b>Redington</b><i>C</i><sub>A</sub> ≥ <i>C</i><sub>L</sub> con <i>C</i> = ${fr("Σ <i>w</i>·<i>T</i>(<i>T</i>+1)", "(1+<i>i</i>)<sup>2</sup>")}`,
);
