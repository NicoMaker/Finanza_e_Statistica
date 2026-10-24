function enumDispRip(n, k, lim) {
  const out = [],
    cur = [];
  (function rec() {
    if (out.length >= lim) return;
    if (cur.length === k) return void out.push(cur.slice());
    for (let i = 0; i < n && out.length < lim; i++) {
      cur.push(i);
      rec();
      cur.pop();
    }
  })();
  return out;
}
