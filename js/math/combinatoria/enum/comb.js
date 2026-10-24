function enumComb(n, k, lim) {
  const out = [],
    cur = [];
  (function rec(s) {
    if (out.length >= lim) return;
    if (cur.length === k) return void out.push(cur.slice());
    for (let i = s; i < n && out.length < lim; i++) {
      cur.push(i);
      rec(i + 1);
      cur.pop();
    }
  })(0);
  return out;
}
