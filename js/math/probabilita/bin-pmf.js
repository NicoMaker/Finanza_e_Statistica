/* ---------- Distribuzioni discrete ---------- */
// Binomiale B(n,p): P(X = k)
function binPmf(n, k, p) {
  if (k < 0 || k > n || !Number.isInteger(k)) return 0;
  if (p <= 0) return k === 0 ? 1 : 0;
  if (p >= 1) return k === n ? 1 : 0;
  return Math.exp(lnComb(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
}
