// Ipergeometrica: N elementi, K "buoni", n estratti senza reinserimento, k buoni estratti. Esatta (BigInt)
function hypNum(N, K, n, k) {
  return bComb(K, k) * bComb(N - K, n - k);
}
