// Sezione «Tasso patrimoniale»: crescita del patrimonio con versamenti, imposte e inflazione
FM.pat = eq(
  `<b>Patrimonio</b><i>W</i><sub>t</sub> = <i>W</i><sub>t−1</sub>·(1+<i>r</i><sub>n</sub>) + <i>V</i>`,
  `<b>Tasso netto</b><i>r</i><sub>n</sub> = <i>r</i>·(1−<i>τ</i>)`,
  `<b>Tasso reale</b><i>r</i><sub>r</sub> = ${fr("1+<i>r</i><sub>n</sub>", "1+<i>π</i>")} − 1`,
  `<b>Tasso patrimoniale</b><i>g</i> = (${fr("<i>W</i><sub>n</sub>", "<i>W</i><sub>0</sub>")})<sup>1/n</sup> − 1 , &nbsp;raddoppio = ${fr("ln 2", "ln(1+<i>r</i><sub>n</sub>)")}`,
);
T.pat = {
  n: "Tasso patrimoniale",
  s: "W",
  fm: FM.pat,
  f: [
    { k: "w0", l: "Patrimonio iniziale (€)", v: 50000 },
    { k: "v", l: "Versamento annuo (€)", v: 6000 },
    { k: "n", l: "Orizzonte (anni)", v: 20 },
    { k: "r", l: "Rendimento lordo annuo (%)", v: 5 },
    { k: "t", l: "Imposta sui rendimenti (%)", v: 26 },
    { k: "i", l: "Inflazione annua (%)", v: 2 },
    { k: "g", l: "Patrimonio obiettivo (€)", v: 500000 },
    { k: "d0", l: "Debito iniziale (€)", v: 30000 },
    { k: "rm", l: "Rimborso annuo del debito (€)", v: 3000 },
  ],
  c(v) {
    const n = Math.round(v.n);
    if (!(n >= 1 && n <= 100))
      return ER("L'orizzonte deve essere tra 1 e 100 anni.");
    const rn = (v.r * (1 - v.t / 100)) / 100,
      pi = v.i / 100,
      W = [v.w0];
    for (let t = 1; t <= n; t++) W.push(W[t - 1] * (1 + rn) + v.v);
    const Wn = W[n],
      real = W.map((w, t) => w / (1 + pi) ** t),
      cum = W.map((_, t) => v.w0 + v.v * t),
      g = v.w0 > 0 && Wn > 0 ? (Wn / v.w0) ** (1 / n) - 1 : NaN,
      rr = (1 + rn) / (1 + pi) - 1,
      dbl = rn > 0 ? Math.log(2) / Math.log(1 + rn) : NaN;
    let w = v.w0,
      y = 0;
    while (w < v.g && y < 200 && (rn > 0 || v.v > 0)) {
      w = w * (1 + rn) + v.v;
      y++;
    }
    const xs = W.map((_, t) => t),
      D = W.map((_, t) => Math.max(0, v.d0 - v.rm * t)),
      E = W.map((w, t) => w - D[t]),
      rowP = (t) =>
        `<tr><td>${t}</td><td>${f2(W[t])}</td><td>${f2(D[t])}</td><td>${f2(E[t])}</td><td>${f2(W[t] > 0 ? (D[t] / W[t]) * 100 : 0)}%</td><td>${f2(cum[t])}</td><td>${f2(W[t] - cum[t])}</td></tr>`,
      hd =
        "<tr><th>Anno</th><th>Attivo (patrimonio)</th><th>Passivo (debiti)</th><th>Patrimonio netto</th><th>Debito/attivo</th><th>Totale versato</th><th>Rendimenti</th></tr>",
      idx = [...new Set([0, 0.25, 0.5, 0.75, 1].map((x) => Math.round(x * n)))],
      pb =
        `<div class="pt"><h3 class="pth"><span class="sy">🧾</span>Situazione patrimoniale</h3>` +
        ks([
          K("Patrimonio netto iniziale", f2(E[0]), 1),
          K("Patrimonio netto a metà orizzonte", f2(E[Math.round(n / 2)])),
          K("Patrimonio netto finale", f2(E[n])),
          K("Debito/attivo finale", f2(Wn > 0 ? (D[n] / Wn) * 100 : 0) + "%"),
        ]) +
        `<p class="note">Attivo = patrimonio accumulato, passivo = debito residuo (rimborso lineare), patrimonio netto = attivo − passivo.</p>` +
        `<div class="tb"><table>${hd}${idx.map(rowP).join("")}</table></div>` +
        plot({
          t: "Attivo, passivo e patrimonio netto",
          xs,
          zero: 1,
          lines: [
            { n: "Attivo", c: PAL[0], v: W },
            { n: "Passivo (debiti)", c: PAL[3], v: D },
            { n: "Patrimonio netto", c: PAL[2], a: 1, v: E },
          ],
          xf: (x) => x + " a",
          lb: xs.map((t) => "Anno " + t),
        }) +
        `<details class="ptd"><summary>Prospetto patrimoniale completo, anno per anno</summary><div class="tb"><table>${hd}${xs.map(rowP).join("")}</table></div></details></div>`;
    return (
      ks([
        K("Patrimonio finale", f2(Wn), 1),
        K("In euro di oggi", f2(real[n])),
        K("Versato in totale", f2(cum[n])),
        K("Rendimenti netti maturati", f2(Wn - cum[n])),
      ]) +
      ks([
        K("Tasso netto annuo", f2(rn * 100) + "%"),
        K("Tasso reale (Fisher)", f2(rr * 100) + "%"),
        K("Tasso patrimoniale g", isFinite(g) ? f2(g * 100) + "%" : "—"),
        K(
          "Raddoppio (solo rendimento)",
          isFinite(dbl) ? f2(dbl) + " anni" : "—",
        ),
        K("Obiettivo raggiunto in", w >= v.g ? y + " anni" : "oltre 200 anni"),
      ]) +
      `<p class="note">Il tasso patrimoniale g misura la crescita annua composta del patrimonio comprensiva dei versamenti; il tasso netto è il rendimento puro dopo le imposte.</p>` +
      plot({
        t: "Evoluzione del patrimonio",
        xs,
        lines: [
          { n: "Patrimonio nominale", c: PAL[0], a: 1, v: W },
          { n: "In euro di oggi", c: PAL[2], v: real },
          { n: "Capitale versato", c: PAL[1], d: "5 4", v: cum },
        ],
        xf: (x) => x + " a",
        lb: xs.map((t) => "Anno " + t),
      }) +
      pb
    );
  },
};
