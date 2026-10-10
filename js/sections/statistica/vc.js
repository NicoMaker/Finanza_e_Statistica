// Sezione «Statistica (varianza/covarianza)»: formule (FM.vc) e calcolatore (T.vc)
FM.vc = eq(
  `<b>Medie</b><i>μ</i><sub>X</sub> = ${fr("Σ <i>x</i><sub>k</sub>", "<i>n</i>")} , &nbsp;<i>μ</i><sub>Y</sub> = ${fr("Σ <i>y</i><sub>k</sub>", "<i>n</i>")}`,
  `<b>Varianza</b><i>σ</i><sub>X</sub><sup>2</sup> = ${fr("Σ (<i>x</i><sub>k</sub> − <i>μ</i><sub>X</sub>)<sup>2</sup>", "<i>n</i>")} &nbsp;(popolazione) , &nbsp;<i>s</i><sub>X</sub><sup>2</sup> = ${fr("Σ (<i>x</i><sub>k</sub> − <i>μ</i><sub>X</sub>)<sup>2</sup>", "<i>n</i> − 1")} &nbsp;(campionaria)`,
  `<b>Covarianza</b><i>σ</i><sub>XY</sub> = ${fr("Σ (<i>x</i><sub>k</sub> − <i>μ</i><sub>X</sub>)(<i>y</i><sub>k</sub> − <i>μ</i><sub>Y</sub>)", "<i>n</i>")} = <i>E</i>[<i>XY</i>] − <i>μ</i><sub>X</sub>·<i>μ</i><sub>Y</sub>`,
  `<b>Correlazione</b><i>ρ</i> = ${fr("<i>σ</i><sub>XY</sub>", "<i>σ</i><sub>X</sub>·<i>σ</i><sub>Y</sub>")} , &nbsp;−1 ≤ <i>ρ</i> ≤ 1`,
  `<b>Regressione</b><i>y</i> = <i>a</i> + <i>b</i>·<i>x</i> , &nbsp;<i>b</i> = ${fr("<i>σ</i><sub>XY</sub>", "<i>σ</i><sub>X</sub><sup>2</sup>")} , &nbsp;<i>a</i> = <i>μ</i><sub>Y</sub> − <i>b</i>·<i>μ</i><sub>X</sub>`,
  `<b>Portafoglio</b><i>σ</i><sub>P</sub><sup>2</sup> = <i>w</i><sup>2</sup><i>σ</i><sub>X</sub><sup>2</sup> + (1−<i>w</i>)<sup>2</sup><i>σ</i><sub>Y</sub><sup>2</sup> + 2<i>w</i>(1−<i>w</i>)<i>σ</i><sub>XY</sub> , &nbsp;<i>w</i>* = ${fr("<i>σ</i><sub>Y</sub><sup>2</sup> − <i>σ</i><sub>XY</sub>", "<i>σ</i><sub>X</sub><sup>2</sup> + <i>σ</i><sub>Y</sub><sup>2</sup> − 2<i>σ</i><sub>XY</sub>")}`,
);
T.vc = {
  n: "Varianza e covarianza",
  s: "σ",
  fm: FM.vc,
  f: [
    {
      k: "x",
      l: "Serie X (separati da ; o a capo)",
      t: "a",
      v: "5; 7; 9; 4; 6; 8",
    },
    {
      k: "y",
      l: "Serie Y (stesso numero di valori)",
      t: "a",
      v: "3; 8; 6; 2; 5; 7",
    },
    {
      k: "k",
      l: "Tipo di calcolo",
      t: "s",
      o: [
        ["c", "Campionaria (divisore n − 1)"],
        ["p", "Popolazione (divisore n)"],
      ],
      v: "c",
    },
    { k: "w", l: "Peso di X nel portafoglio (%)", v: 50 },
  ],
  c(v) {
    const X = nums(v.x),
      Y = nums(v.y),
      n = Math.min(X.length, Y.length);
    if (n < 2)
      return '<p class="err">Inserisci almeno due valori per X e per Y (stesso numero).</p>';
    const x = X.slice(0, n),
      y = Y.slice(0, n),
      d = v.k == "c" ? n - 1 : n,
      mx = x.reduce((a, b) => a + b, 0) / n,
      my = y.reduce((a, b) => a + b, 0) / n,
      dx = x.map((a) => a - mx),
      dy = y.map((a) => a - my),
      vx = dx.reduce((a, b) => a + b * b, 0) / d,
      vy = dy.reduce((a, b) => a + b * b, 0) / d,
      cv = dx.reduce((a, b, k) => a + b * dy[k], 0) / d,
      sx = Math.sqrt(vx),
      sy = Math.sqrt(vy),
      rho = cv / (sx * sy),
      b = cv / vx,
      a = my - b * mx,
      w = v.w / 100,
      vp = w * w * vx + (1 - w) ** 2 * vy + 2 * w * (1 - w) * cv,
      den = vx + vy - 2 * cv,
      wm = den > 1e-12 ? (vy - cv) / den : NaN;
    const pad = (Math.max(...x) - Math.min(...x) || 1) * 0.1,
      xa = Math.min(...x) - pad,
      xb = Math.max(...x) + pad,
      ws = [...Array(41)].map((_, j) => j * 2.5),
      vpw = (q) => {
        q /= 100;
        return q * q * vx + (1 - q) ** 2 * vy + 2 * q * (1 - q) * cv;
      };
    const note = isFinite(rho)
      ? Math.abs(rho) < 0.1
        ? "praticamente nessuna relazione lineare"
        : rho > 0
          ? "le due serie tendono a muoversi nello stesso verso"
          : "le due serie tendono a muoversi in verso opposto"
      : "correlazione non definita (varianza nulla)";
    return (
      ks([
        K("Covarianza σXY", f4(cv), 1),
        K("Varianza X", f4(vx)),
        K("Varianza Y", f4(vy)),
        K("Dev. standard X", f4(sx)),
        K("Dev. standard Y", f4(sy)),
        K("Correlazione ρ", f4(rho)),
        K("Media X", f4(mx)),
        K("Media Y", f4(my)),
      ]) +
      `<p class="note">${v.k == "c" ? "Stime campionarie (n − 1)." : "Valori di popolazione (n)."} Covarianza ${cv > 0 ? "positiva" : cv < 0 ? "negativa" : "nulla"}: ${note}.${vx > 0 ? ` Retta di regressione: y = ${f4(a)} ${b < 0 ? "−" : "+"} ${f4(Math.abs(b))}·x , R² = ${f4(rho * rho)}.` : ""}</p>` +
      `<h3 style="font-size:.95rem;margin:18px 0 10px">Portafoglio di due titoli (X con peso w, Y con 1 − w)</h3>` +
      ks([
        K("Peso w di X", f2(v.w) + "%"),
        K("Varianza di portafoglio", f4(vp), 1),
        K("Dev. standard di portafoglio", f4(Math.sqrt(Math.max(vp, 0)))),
        K(
          "Peso di X a varianza minima",
          isFinite(wm) ? f2(wm * 100) + "%" : "—",
        ),
      ]) +
      `<div class="tb"><table><tr><th>k</th><th>x</th><th>y</th><th>x − μX</th><th>y − μY</th><th>(x − μX)(y − μY)</th></tr>${x.map((q, k) => `<tr><td>${k + 1}</td><td>${f4(q)}</td><td>${f4(y[k])}</td><td>${f4(dx[k])}</td><td>${f4(dy[k])}</td><td>${f4(dx[k] * dy[k])}</td></tr>`).join("")}</table></div>` +
      plot({
        t: "Diagramma di dispersione e retta di regressione",
        xs: [xa, xb],
        lines:
          vx > 0
            ? [
                {
                  n: "Retta di regressione",
                  c: PAL[1],
                  v: [a + b * xa, a + b * xb],
                },
              ]
            : [],
        marks: x
          .map((q, k) => ({
            x: q,
            y: y[k],
            c: PAL[0],
            l: `(${f2(q)} ; ${f2(y[k])})`,
          }))
          .concat([
            {
              x: mx,
              y: my,
              c: PAL[3],
              l: `Baricentro (${f2(mx)} ; ${f2(my)})`,
            },
          ]),
        xf: (q) => sh(q),
        yf: f2,
      }) +
      plot({
        t: "Varianza di portafoglio al variare del peso di X",
        xs: ws,
        lines: [
          {
            n: "Varianza di portafoglio",
            c: PAL[0],
            a: 1,
            v: ws.map(vpw),
          },
        ],
        marks: [
          {
            x: Math.min(100, Math.max(0, v.w)),
            y: vpw(Math.min(100, Math.max(0, v.w))),
            c: PAL[1],
            l: "Tua scelta: w = " + f2(v.w) + "%",
          },
        ].concat(
          isFinite(wm) && wm >= 0 && wm <= 1
            ? [
                {
                  x: wm * 100,
                  y: vpw(wm * 100),
                  c: PAL[3],
                  l: "Varianza minima: w = " + f2(wm * 100) + "%",
                },
              ]
            : [],
        ),
        xf: (q) => sh(q) + "%",
        yf: f4,
        lb: ws.map((q) => "w = " + f2(q) + "%"),
      })
    );
  },
};
