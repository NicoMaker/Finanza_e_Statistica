// Somma di una distribuzione tra due estremi (inclusi)
function sumPmf(f, a, b) {
  let s = 0;
  for (let k = a; k <= b; k++) s += f(k);
  return Math.min(1, s);
}
