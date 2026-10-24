/* ---------- Eventi e Bayes ---------- */
// Teorema di Bayes con partizione H1..Hn: restituisce P(E) e le probabilità a posteriori
function bayes(pri, ver) {
  const pe = pri.reduce((s, p, i) => s + p * ver[i], 0);
  return { pe, post: pri.map((p, i) => (pe > 0 ? (p * ver[i]) / pe : NaN)) };
}
