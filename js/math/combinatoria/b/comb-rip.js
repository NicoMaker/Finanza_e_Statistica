// Combinazioni con ripetizione C'(n,k) = C(n+k−1, k)
function bCombRip(n, k) {
  if (k === 0) return 1n;
  if (n === 0) return 0n;
  return bComb(n + k - 1, k);
}
