// Calcolo dei risultati
T.cap.c = function (v) {
  const A = nums(v.a),
    B = nums(v.b),
    nn = Math.min(A.length, B.length);
  let beta = v.beta,
    fs = false;
  if (nn >= 2) {
    const a = A.slice(0, nn),
      b = B.slice(0, nn),
      ma = a.reduce((x, y) => x + y, 0) / nn,
      mb = b.reduce((x, y) => x + y, 0) / nn,
      cv = a.reduce((s, x, k) => s + (x - ma) * (b[k] - mb), 0),
      vb = b.reduce((s, x) => s + (x - mb) ** 2, 0);
    if (vb > 0) {
      beta = cv / vb;
      fs = true;
    }
  }
  const rf = v.rf,
    rm = v.rm,
    ce = rf + beta * (rm - rf),
    xs = [...Array(26)].map((_, k) => k * 0.1);
  return (
    ks([
      K("Rendimento atteso CAPM", f2(ce) + "%", 1),
      K("Beta usato", f4(beta)),
      K("Premio di mercato rm − rf", f2(rm - rf) + "%"),
      K("Premio atteso del titolo", f2(beta * (rm - rf)) + "%"),
      K("Indice di Sharpe", v.sp > 0 ? f4((v.rp - rf) / v.sp) : "—"),
      K("Sharpe del mercato", v.sm > 0 ? f4((rm - rf) / v.sm) : "—"),
      K("Indice di Treynor", beta ? f4((v.rp - rf) / beta) + "%" : "—"),
      K("Alpha di Jensen", f2(v.rp - ce) + "%"),
    ]) +
    `<p class="note">${fs ? "Beta calcolato dalle serie inserite (cov/var)." : "Beta inserito manualmente."} ${v.rp - ce > 0 ? "Alpha positivo: il portafoglio ha reso più di quanto richiesto dal suo rischio sistematico." : "Alpha non positivo: rendimento non superiore a quello richiesto dal rischio."}</p>` +
    plot({
      t: "Security Market Line",
      xs,
      lines: [
        {
          n: "SML: rf + β(rm − rf)",
          c: PAL[0],
          a: 1,
          v: xs.map((b) => rf + b * (rm - rf)),
        },
      ],
      marks: [
        {
          x: 1,
          y: rm,
          c: PAL[1],
          l: "Mercato (β = 1): " + f2(rm) + "%",
        },
        {
          x: beta,
          y: ce,
          c: PAL[3],
          l: "CAPM: " + f2(ce) + "% con β = " + f4(beta),
        },
        {
          x: beta,
          y: v.rp,
          c: PAL[2],
          l: "Portafoglio: " + f2(v.rp) + "%",
        },
      ],
      yf: (q) => f2(q) + "%",
      xf: (q) => f2(q),
      lb: xs.map((b) => "β = " + f2(b)),
    })
  );
};
