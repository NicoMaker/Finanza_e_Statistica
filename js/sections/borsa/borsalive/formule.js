// Sezione «Borsa Live»: formule (FM.bl) e scheda (T.bl) del robot di trading simulato
// Logica in js/math/borsa-*.js, dati e parametri in json/borsa/*.json, grafico in js/charts/borsa/, pannelli in js/ui/borsalive-panels.js
// I prezzi sono generati a caso: è una simulazione didattica, non quotazioni reali.
FM.bl = eq(
  `<b>Valore totale</b><i>V</i> = <i>C</i> + Σ <i>q</i><sub>j</sub>·<i>P</i><sub>j</sub>`,
  `<b>Rendimento posizione</b><i>r</i> = ${fr("<i>P</i> − <i>P</i><sub>m</sub>", "<i>P</i><sub>m</sub>")}·100`,
  `<b>P&amp;L totale</b>${fr("<i>V</i> − <i>V</i><sub>0</sub>", "<i>V</i><sub>0</sub>")}·100`,
  `<b>Vendita</b><i>r</i> ≥ soglia di profitto &nbsp;oppure&nbsp; <i>r</i> ≤ ${ROBOT.stopLoss}%`,
);
