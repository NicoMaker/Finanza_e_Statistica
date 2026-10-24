// Coefficiente binomiale C(n,k) = n! / (k!(n−k)!)
function bComb(n, k) {
  if (k < 0 || k > n) return 0n;
  if (k > n - k) k = n - k;
  let r = 1n;
  for (let i = 1; i <= k; i++) r = (r * BigInt(n - k + i)) / BigInt(i);
  return r;
}
