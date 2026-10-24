// Sconvolgimenti (derangement) !n: permutazioni senza punti fissi
function bDerang(n) {
  let a = 1n,
    b = 0n; // !0, !1
  if (n === 0) return 1n;
  for (let i = 2; i <= n; i++) [a, b] = [b, BigInt(i - 1) * (a + b)];
  return b;
}
