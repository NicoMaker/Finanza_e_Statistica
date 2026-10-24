// Sconvolgimenti: nessun elemento resta al suo posto
function enumDerang(n, lim) {
  const out = [],
    cur = [],
    used = Array(n).fill(false);
  (function rec() {
    if (out.length >= lim) return;
    const p = cur.length;
    if (p === n) return void out.push(cur.slice());
    for (let i = 0; i < n && out.length < lim; i++) {
      if (used[i] || i === p) continue;
      used[i] = true;
      cur.push(i);
      rec();
      cur.pop();
      used[i] = false;
    }
  })();
  return out;
}
