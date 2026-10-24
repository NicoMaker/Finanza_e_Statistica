// Partizioni di {0..n−1} in esattamente k gruppi non vuoti (stringhe a crescita limitata)
function enumStirling(n, k, lim) {
  const out = [],
    a = [];
  (function rec(i, m) {
    if (out.length >= lim) return;
    if (n - i < k - m) return; // non si fa più in tempo a creare i gruppi
    if (i === n) {
      if (m === k) {
        const g = Array.from({ length: k }, () => []);
        a.forEach((b, x) => g[b].push(x));
        out.push(g);
      }
      return;
    }
    for (let b = 0; b <= Math.min(m, k - 1) && out.length < lim; b++) {
      a.push(b);
      rec(i + 1, Math.max(m, b + 1));
      a.pop();
    }
  })(0, 0);
  return out;
}
