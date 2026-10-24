// Permutazioni con ripetizione (anagrammi / coefficiente multinomiale): n! / (n1!·n2!·…)
function bMulti(cs) {
  const n = cs.reduce((a, b) => a + b, 0);
  return cs.reduce((r, c) => r / bFact(c), bFact(n));
}
