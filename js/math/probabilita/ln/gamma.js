function lnGamma(x) {
  let y = x,
    t = x + 5.5,
    s = 1.000000000190015;
  t -= (x + 0.5) * Math.log(t);
  for (let j = 0; j < 6; j++) s += _lg[j] / ++y;
  return -t + Math.log((2.5066282746310005 * s) / x);
}
