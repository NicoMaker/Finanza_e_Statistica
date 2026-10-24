// Principio moltiplicativo: una scelta per ogni passo (sizes = opzioni di ciascun passo)
function enumProdotto(sizes, lim) {
  const out = [],
    cur = [];
  (function rec(i) {
    if (out.length >= lim) return;
    if (i === sizes.length) return void out.push(cur.slice());
    for (let j = 0; j < sizes[i] && out.length < lim; j++) {
      cur.push(j);
      rec(i + 1);
      cur.pop();
    }
  })(0);
  return out;
}
