// Sezione «Opzioni (Black-Scholes)»: formule (FM.opz) e calcolatore (T.opz)
FM.opz = eq(
  `<b>Call</b><i>C</i> = <i>S</i>e<sup>−qT</sup><i>N</i>(<i>d</i><sub>1</sub>) − <i>K</i>e<sup>−rT</sup><i>N</i>(<i>d</i><sub>2</sub>)`,
  `<b>Put</b><i>P</i> = <i>K</i>e<sup>−rT</sup><i>N</i>(−<i>d</i><sub>2</sub>) − <i>S</i>e<sup>−qT</sup><i>N</i>(−<i>d</i><sub>1</sub>)`,
  `<b>d</b><sub>1</sub> = ${fr("ln(<i>S</i>/<i>K</i>) + (<i>r</i> − <i>q</i> + <i>σ</i><sup>2</sup>/2)<i>T</i>", "<i>σ</i>√<i>T</i>")} , &nbsp;<i>d</i><sub>2</sub> = <i>d</i><sub>1</sub> − <i>σ</i>√<i>T</i>`,
  `<b>Parità put-call</b><i>C</i> − <i>P</i> = <i>S</i>e<sup>−qT</sup> − <i>K</i>e<sup>−rT</sup>`,
);
T.opz = {
  n: "Opzioni (Black–Scholes)",
  s: "Δ",
  fm: FM.opz,
  f: [
    { k: "S", l: "Prezzo del sottostante S (€)", v: 100 },
    { k: "K", l: "Prezzo di esercizio K (€)", v: 100 },
    { k: "T", l: "Scadenza (anni)", v: 1 },
    { k: "r", l: "Tasso privo di rischio annuo continuo (%)", v: 3 },
    { k: "s", l: "Volatilità annua σ (%)", v: 20 },
    { k: "q", l: "Dividend yield continuo (%)", v: 0 },
  ],
  c(v) {
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
  },
};
