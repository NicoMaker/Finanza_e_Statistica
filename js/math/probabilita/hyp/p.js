// Ipergeometrica veloce: esatta fino a N = 170, poi con i logaritmi (serve per sommare molti termini)
const hypP = (N, K, n, k) =>
  k < 0 || k > K || n - k < 0 || n - k > N - K
    ? 0
    : N <= 170
      ? hypPmf(N, K, n, k)
      : Math.exp(lnComb(K, k) + lnComb(N - K, n - k) - lnComb(N, n));
