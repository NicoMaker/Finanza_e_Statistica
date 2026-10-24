// Caso «Dadi»
T.prb.casi.da = function (v) {
  const tp = v.tp;
  const nd = Math.round(v.dn),
    fc = Math.round(v.df),
    s = Math.round(v.ds);
  if (!(nd >= 1 && nd <= 30) || !(fc >= 2 && fc <= 100) || nd * fc > 1500)
    return ER(
      "Usa da 1 a 30 dadi con 2–100 facce (dadi × facce al massimo 1.500).",
    );
  const w = dadiWays(nd, fc),
    tot = bDispRip(fc, nd),
    xs0 = Array.from({ length: nd * fc - nd + 1 }, (_, i) => nd + i),
    ps0 = xs0.map((x) => bRatio(w[x], tot)),
    W = prFinestra(xs0, ps0),
    xs = W.xs,
    ps = W.ps,
    at = (x) => (x >= 0 && x < w.length ? w[x] : 0n);
  let le = 0n,
    ge = 0n;
  for (let x = nd; x <= Math.min(s, nd * fc); x++) le += at(x);
  for (let x = Math.max(s, nd); x <= nd * fc; x++) ge += at(x);
  const mean = (nd * (fc + 1)) / 2,
    vr = (nd * (fc * fc - 1)) / 12;
  return (
    ks([
      K(`P(somma = ${s})`, fpct(bRatio(at(s), tot)), 1),
      K(`Modi per fare ${s}`, bFmt(at(s))),
      K("Casi possibili f^n", bFmt(tot)),
      K(`P(somma ≤ ${s})`, fpct(bRatio(le, tot))),
      K(`P(somma ≥ ${s})`, fpct(bRatio(ge, tot))),
      K("Somma media n(f+1)/2", f2(mean)),
      K("Deviazione standard", f4(Math.sqrt(vr))),
    ]) +
    prBarre(`Somma di ${nd} dadi a ${fc} facce`, xs, ps, "Somma") +
    (!W.tagliato && xs.length <= 60
      ? TB(
          ["Somma", "Modi", "Probabilità", "1 su …"],
          xs.map((x, i) => [fg(x), bFmt(w[x]), fpct(ps[i]), bUnoSu(w[x], tot)]),
        )
      : "")
  );
};
