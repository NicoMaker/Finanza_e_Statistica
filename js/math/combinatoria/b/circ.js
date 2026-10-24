// Permutazioni circolari (n−1)!  e  collane/braccialetti (n−1)!/2 (si possono rovesciare)
const bCirc = (n) => (n <= 1 ? 1n : bFact(n - 1));
