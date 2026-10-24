// Probabilità: distribuzioni (binomiale, ipergeometrica, geometrica, Poisson, normale), dadi, Bayes
// Richiede js/math/combinatoria.js (bComb, bRatio, ...).

/* ---------- Funzioni speciali ---------- */
// ln Γ(x) (approssimazione di Lanczos, errore ~1e-15)
const _lg = [
  76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155,
  0.1208650973866179e-2, -0.5395239384953e-5,
];
