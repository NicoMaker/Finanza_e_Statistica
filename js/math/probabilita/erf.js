// erf / erfc: serie per |x| piccolo, frazione continua per |x| grande
function erf(x) {
  if (x < 0) return -erf(-x);
  if (x >= 2.5) return 1 - erfc(x);
  let s = x,
    t = x;
  for (let n = 1; n < 80; n++) {
    t *= (-x * x) / n;
    s += t / (2 * n + 1);
  }
  return (2 / Math.sqrt(Math.PI)) * s;
}
