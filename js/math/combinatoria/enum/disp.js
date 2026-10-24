/* ---------- Elenco di TUTTI i casi (si ferma a lim) ---------- */
// Ogni funzione restituisce un array di casi; ogni caso è un array di indici (0..n−1).
function enumDisp(n, k, lim) {
  const out = [],
    cur = [],
    used = Array(n).fill(false);
  (function rec() {
    if (out.length >= lim) return;
    if (cur.length === k) return void out.push(cur.slice());
    for (let i = 0; i < n && out.length < lim; i++) {
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
