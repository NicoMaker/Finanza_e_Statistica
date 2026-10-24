// Collane: come i giri di tavolo, ma una collana rovesciata è la stessa collana
function enumCollana(n, lim) {
  if (n <= 2) return enumCirc(n, lim);
  const out = [],
    cur = [0],
    used = Array(n).fill(false);
  used[0] = true;
  (function rec() {
    if (out.length >= lim) return;
    if (cur.length === n) {
      if (cur[1] < cur[n - 1]) out.push(cur.slice()); // una sola delle due «versioni» rovesciate
      return;
    }
    for (let i = 1; i < n && out.length < lim; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(i);
      rec();
      cur.pop();
      used[i] = false;
    }
  })();
  return out;
}
