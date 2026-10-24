// Disposizioni semplici D(n,k) = n·(n−1)·…·(n−k+1)
function bDisp(n, k) {
  if (k < 0 || k > n) return 0n;
  let r = 1n;
  for (let i = 0; i < k; i++) r *= BigInt(n - i);
  return r;
}
