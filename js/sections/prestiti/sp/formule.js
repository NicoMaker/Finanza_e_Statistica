// Sezione «Situazione patrimoniale»: attivo (bene), passivo (mutuo) e patrimonio netto nel tempo
FM.sp = eq(
  `<b>Attivo</b><i>A</i><sub>k</sub> = <i>V</i>·(1+<i>g</i>)<sup>k/m</sup>`,
  `<b>Passivo</b><i>D</i><sub>k</sub> = debito residuo del mutuo (ammortamento francese, rata ${fr("<i>C</i>·<i>i</i>", "1−(1+<i>i</i>)<sup>−N</sup>")})`,
  `<b>Patrimonio netto</b><i>PN</i><sub>k</sub> = <i>A</i><sub>k</sub> − <i>D</i><sub>k</sub> , &nbsp;LTV<sub>k</sub> = ${fr("<i>D</i><sub>k</sub>", "<i>A</i><sub>k</sub>")}`,
);
