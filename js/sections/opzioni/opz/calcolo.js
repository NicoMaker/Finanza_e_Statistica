// Calcolo dei risultati
T.opz.c = function (v) {
  const S = v.S,
    K_ = v.K,
    T = v.T,
    r = v.r / 100,
    s = v.s / 100,
    q = v.q / 100;
  if (!(S > 0 && K_ > 0 && T > 0 && s > 0))
    return ER("S, K, scadenza e volatilità devono essere positivi.");
  const b = bsf(S, K_, T, r, s, q),
    ph = npdf(b.d1),
    sT = Math.sqrt(T),
    th = (-S * b.dq * ph * s) / (2 * sT),
    xs = [...Array(41)].map((_, j) => K_ * (0.5 + j / 40)),
    cc = (x) => bsf(x, K_, T, r, s, q);
  return (
    ks([
      K("Prezzo Call", f4(b.c), 1),
      K("Prezzo Put", f4(b.p), 1),
      K("d1", f4(b.d1)),
      K("d2", f4(b.d2)),
      K(
        "Parità C − P",
        f4(b.c - b.p) + " (teorico " + f4(S * b.dq - K_ * b.er) + ")",
      ),
    ]) +
    ks([
      K(
        "Delta Call / Put",
        f4(b.dq * ncdf(b.d1)) + " / " + f4(b.dq * (ncdf(b.d1) - 1)),
      ),
      K("Gamma", f4((b.dq * ph) / (S * s * sT))),
      K("Vega (per 1% di σ)", f4((S * b.dq * ph * sT) / 100)),
      K(
        "Theta Call / Put (al giorno)",
        f4(
          (th - r * K_ * b.er * ncdf(b.d2) + q * S * b.dq * ncdf(b.d1)) / 365,
        ) +
          " / " +
          f4(
            (th + r * K_ * b.er * ncdf(-b.d2) - q * S * b.dq * ncdf(-b.d1)) /
              365,
          ),
      ),
      K(
        "Rho Call / Put (per 1% di r)",
        f4((K_ * T * b.er * ncdf(b.d2)) / 100) +
          " / " +
          f4((-K_ * T * b.er * ncdf(-b.d2)) / 100),
      ),
    ]) +
    `<p class="note">Opzioni europee, modello di Black–Scholes–Merton con dividendo continuo.</p>` +
    plot({
      t: "Valore dell’opzione al variare del sottostante",
      xs,
      zero: 1,
      lines: [
        {
          n: "Call (BS)",
          c: PAL[0],
          a: 1,
          v: xs.map((x) => cc(x).c),
        },
        { n: "Put (BS)", c: PAL[3], v: xs.map((x) => cc(x).p) },
        {
          n: "Valore intrinseco call",
          c: PAL[0],
          d: "5 4",
          v: xs.map((x) => Math.max(x - K_, 0)),
        },
        {
          n: "Valore intrinseco put",
          c: PAL[3],
          d: "5 4",
          v: xs.map((x) => Math.max(K_ - x, 0)),
        },
      ],
      marks: [
        {
          x: S,
          y: b.c,
          c: PAL[1],
          l: "Call a S = " + f2(S) + ": " + f4(b.c),
        },
        {
          x: S,
          y: b.p,
          c: PAL[2],
          l: "Put a S = " + f2(S) + ": " + f4(b.p),
        },
      ],
      yf: f4,
      lb: xs.map((x) => "S = " + f2(x)),
    })
  );
};
