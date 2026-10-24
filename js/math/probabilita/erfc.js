function erfc(x) {
  if (x < 0) return 2 - erfc(-x);
  if (x < 2.5) return 1 - erf(x);
  let f = x;
  for (let k = 80; k >= 1; k--) f = x + k / 2 / f;
  return Math.exp(-x * x) / Math.sqrt(Math.PI) / f;
}
