// Giri di tavolo: il primo elemento è fisso, gli altri si permutano
function enumCirc(n, lim) {
  if (n <= 1) return n ? [[0]] : [[]];
  return enumPerm(n - 1, lim).map((p) => [0, ...p.map((x) => x + 1)]);
}
