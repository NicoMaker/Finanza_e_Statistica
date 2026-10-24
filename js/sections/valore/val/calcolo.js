// Calcolo dei risultati
T.val.c = function (v) {
  const i = v.i / 100;
  let pv, fv, N;
  if (v.m == "s") {
    N = v.n;
    pv = v.C * (1 + i) ** -N;
    fv = v.C * (1 + i) ** N;
    return (
      ks([
        K("Valore attuale", f2(pv), 1),
        K("Montante", f2(fv)),
        K("Fattore di sconto", f4((1 + i) ** -N)),
      ]) + somCh(v.C, i, N)
    );
  }
  const fl =
      v.m == "c" ? Array(Math.max(0, Math.round(v.n))).fill(v.C) : nums(v.fl),
    a = v.p == "a" ? 0 : 1;
  N = fl.length;
  pv = fl.reduce((s, x, k) => s + x * (1 + i) ** -(k + a), 0);
  fv = pv * (1 + i) ** N;
  return (
    ks([
      K("Valore attuale (t=0)", f2(pv), 1),
      K("Montante (t=" + fg(N) + ")", f2(fv)),
      K("Totale rate", f2(fl.reduce((s, x) => s + x, 0))),
      K("Numero rate", fg(N)),
    ]) +
    `<p class="note">${v.p == "a" ? "Anticipata: rate a t = 0 … n−1." : "Posticipata: rate a t = 1 … n."} Montante valutato a t = n.</p>` +
    rendCh(fl, i, a)
  );
};
