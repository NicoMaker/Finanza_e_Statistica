// Ricalcola i grafici quando cambia la larghezza
let rz;
addEventListener("resize", () => {
  clearTimeout(rz);
  rz = setTimeout(calc, 150);
});
