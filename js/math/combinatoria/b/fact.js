// n! (con memoria: i fattoriali già calcolati non si rifanno)
function bFact(n) {
  n = Math.max(0, Math.floor(n));
  for (let i = _fc.length; i <= n; i++) _fc[i] = _fc[i - 1] * BigInt(i);
  return _fc[n];
}
