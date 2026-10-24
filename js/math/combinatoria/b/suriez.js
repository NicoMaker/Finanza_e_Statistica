// Funzioni suriettive da n elementi su k: k!·S(n,k)
const bSuriez = (n, k) => bFact(k) * bStirling2(n, k);
