// Geometrica: primo successo alla prova k (k ≥ 1)
const geoPmf = (p, k) => (k < 1 ? 0 : (1 - p) ** (k - 1) * p);
