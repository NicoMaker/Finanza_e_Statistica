// Anagrammi di un multinsieme: cnt[i] = quante volte compare l'elemento i
function enumMulti(cnt, lim) {
  const tot = cnt.reduce((a, b) => a + b, 0),
    c = cnt.slice(),
    out = [],
    cur = [];
  (function rec() {
    if (out.length >= lim) return;
    if (cur.length === tot) return void out.push(cur.slice());
    for (let i = 0; i < c.length && out.length < lim; i++) {
      if (!c[i]) continue;
      c[i]--;
      cur.push(i);
      rec();
      cur.pop();
      c[i]++;
    }
  })();
  return out;
}
