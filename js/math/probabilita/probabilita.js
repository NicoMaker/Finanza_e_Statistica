// Probabilità: distribuzioni (binomiale, ipergeometrica, geometrica, Poisson, normale), dadi, Bayes
// Richiede js/math/probabilita/combinatoria.js (bComb, bRatio, ...).

/* ---------- Funzioni speciali ---------- */
// ln Γ(x) (approssimazione di Lanczos, errore ~1e-15)
const _lg = [
  76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155,
  0.1208650973866179e-2, -0.5395239384953e-5,
];
function lnGamma(x) {
  let y = x,
    t = x + 5.5,
    s = 1.000000000190015;
  t -= (x + 0.5) * Math.log(t);
  for (let j = 0; j < 6; j++) s += _lg[j] / ++y;
  return -t + Math.log((2.5066282746310005 * s) / x);
}
// ln n!: esatto fino a 170! (poi Lanczos)
const lnFact = (n) =>
  n < 2 ? 0 : n <= 170 ? Math.log(Number(bFact(n))) : lnGamma(n + 1);
const lnComb = (n, k) =>
  k < 0 || k > n ? -Infinity : lnFact(n) - lnFact(k) - lnFact(n - k);

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
function erfc(x) {
  if (x < 0) return 2 - erfc(-x);
  if (x < 2.5) return 1 - erf(x);
  let f = x;
  for (let k = 80; k >= 1; k--) f = x + k / 2 / f;
  return Math.exp(-x * x) / Math.sqrt(Math.PI) / f;
}
// Funzione di ripartizione e densità della normale N(0,1)
const normCdf = (z) => 0.5 * erfc(-z / Math.SQRT2);
const normPdf = (z) => Math.exp((-z * z) / 2) / Math.sqrt(2 * Math.PI);

/* ---------- Distribuzioni discrete ---------- */
// Binomiale B(n,p): P(X = k)
function binPmf(n, k, p) {
  if (k < 0 || k > n || !Number.isInteger(k)) return 0;
  if (p <= 0) return k === 0 ? 1 : 0;
  if (p >= 1) return k === n ? 1 : 0;
  return Math.exp(lnComb(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p));
}
// Poisson(λ): P(X = k)
const poiPmf = (l, k) =>
  k < 0 || !Number.isInteger(k)
    ? 0
    : l === 0
      ? k === 0
        ? 1
        : 0
      : Math.exp(-l + k * Math.log(l) - lnFact(k));
// Geometrica: primo successo alla prova k (k ≥ 1)
const geoPmf = (p, k) => (k < 1 ? 0 : (1 - p) ** (k - 1) * p);
// Ipergeometrica: N elementi, K "buoni", n estratti senza reinserimento, k buoni estratti. Esatta (BigInt)
function hypNum(N, K, n, k) {
  return bComb(K, k) * bComb(N - K, n - k);
}
const hypPmf = (N, K, n, k) => bRatio(hypNum(N, K, n, k), bComb(N, n));
// Ipergeometrica veloce: esatta fino a N = 170, poi con i logaritmi (serve per sommare molti termini)
const hypP = (N, K, n, k) =>
  k < 0 || k > K || n - k < 0 || n - k > N - K
    ? 0
    : N <= 170
      ? hypPmf(N, K, n, k)
      : Math.exp(lnComb(K, k) + lnComb(N - K, n - k) - lnComb(N, n));
// Somma di una distribuzione tra due estremi (inclusi)
function sumPmf(f, a, b) {
  let s = 0;
  for (let k = a; k <= b; k++) s += f(k);
  return Math.min(1, s);
}

/* ---------- Dadi ---------- */
// Quante combinazioni (ordinate) danno ciascuna somma con nd dadi da `fac` facce. Indice = somma.
function dadiWays(nd, fac) {
  let w = [1n]; // zero dadi: somma 0 in un solo modo
  for (let d = 1; d <= nd; d++) {
    const nx = Array(d * fac + 1).fill(0n);
    for (let s = 0; s < w.length; s++) {
      if (!w[s]) continue;
      for (let f = 1; f <= fac; f++) nx[s + f] += w[s];
    }
    w = nx;
  }
  return w;
}

/* ---------- Eventi e Bayes ---------- */
// Teorema di Bayes con partizione H1..Hn: restituisce P(E) e le probabilità a posteriori
function bayes(pri, ver) {
  const pe = pri.reduce((s, p, i) => s + p * ver[i], 0);
  return { pe, post: pri.map((p, i) => (pe > 0 ? (p * ver[i]) / pe : NaN)) };
}
