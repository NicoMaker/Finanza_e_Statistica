/* ---------- Da BigInt a numeri e testo ---------- */
// Rapporto a/b come numero (anche se a e b sono enormi o a è minuscolo rispetto a b)
function bRatio(a, b) {
  if (b === 0n) return NaN;
  if (a === 0n) return 0;
  const P = Math.max(0, b.toString().length - a.toString().length + 20);
  const q = (a * 10n ** BigInt(P)) / b;
  return parseFloat(q.toString() + "e-" + P);
}
