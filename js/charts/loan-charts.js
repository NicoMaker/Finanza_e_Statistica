// Grafici e tabelle per ammortamenti e prestiti
function ammCh(R, C, t0, ti) {
  const g = Math.ceil(R.length / 60),
    G = [];
  for (let j = 0; j < R.length; j += g) {
    const q = R.slice(j, j + g);
    G.push([
      q[0][0],
      q[q.length - 1][0],
      q.reduce((a, r) => a + r[2], 0),
      q.reduce((a, r) => a + r[3], 0),
    ]);
  }
  const RR = (t0 ? [[0, 0, 0, 0, C]] : []).concat(R);
  return (
    donut(
      "Capitale e interessi",
      [
        { n: "Capitale", v: C, c: PAL[0] },
        { n: "Interessi", v: ti, c: PAL[1] },
      ],
      "interessi",
    ) +
    plot({
      t: "Composizione della rata" + (g > 1 ? " (aggregata)" : ""),
      xs: G.map((_, j) => j + 1),
      stack: 1,
      bars: [
        { n: "Quota capitale", c: PAL[0], v: G.map((x) => x[2]) },
        { n: "Quota interessi", c: PAL[1], v: G.map((x) => x[3]) },
      ],
      lb: G.map((x) => (g > 1 ? `Periodi ${x[0]}–${x[1]}` : `Periodo ${x[0]}`)),
      xf: (x) => Math.round(R[0][0] + (x - 1) * g),
    }) +
    plot({
      t: "Debito residuo",
      xs: RR.map((r) => r[0]),
      zero: 1,
      lines: [{ n: "Debito residuo", c: PAL[2], a: 1, v: RR.map((r) => r[4]) }],
      lb: RR.map((r) => "Periodo " + r[0]),
    })
  );
}
function ricPlan(v, N, i) {
  const C = v.C,
    m = +v.m,
    i2 = (1 + v.rr / 100) ** (1 / m) - 1,
    s = i2 ? (C * i2) / ((1 + i2) ** N - 1) : C / N,
    I = C * i,
    R = [];
  let F = 0;
  for (let k = 1; k <= N; k++) {
    const g = F * i2;
    F += g + s;
    R.push([k, I, s, g, k == N ? C : F, I + s]);
  }
  const out_ = I + s,
    tot = out_ * N,
    ig = C - N * s,
    net = N * I - ig,
    q = (j) => {
      let z = 0;
      for (let k = 1; k <= N; k++) z += out_ * (1 + j) ** -k;
      return z - C;
    };
  let lo = 0,
    hi = 1;
  for (let z = 0; z < 80; z++) {
    const mid = (lo + hi) / 2;
    q(mid) > 0 ? (lo = mid) : (hi = mid);
  }
  const cost = ((1 + lo) ** m - 1) * 100,
    xs = [...Array(N + 1).keys()],
    fund = [0, ...R.map((r) => r[4])];
  return (
    ks([
      K("Rata costitutiva", f2(s), 1),
      K("Interessi al creditore (per periodo)", f2(I)),
      K("Esborso periodico totale", f2(out_)),
      K("Totale versato", f2(tot)),
      K("Interessi maturati sul fondo", f2(ig)),
      K("Interessi netti a carico", f2(net)),
      K("Costo effettivo annuo", f2(cost) + "%"),
      K("Tasso periodale ricostituzione", f4(i2 * 100) + "%"),
    ]) +
    `<p class="note">Americano con ricostituzione: ogni periodo paghi gli interessi C·i al creditore e versi la rata costitutiva s in un fondo che rende i′ (periodale). Alla scadenza il fondo vale esattamente C e rimborsa il prestito in un’unica soluzione. Se i′ &lt; i il costo effettivo supera il tasso del prestito.</p>` +
    `<div class="tb"><table><tr><th>Periodo</th><th>Interessi al creditore</th><th>Rata costitutiva</th><th>Interessi sul fondo</th><th>Capitale costituito</th><th>Esborso totale</th></tr>${R.map(
      (r) =>
        `<tr><td>${r[0]}</td>${r
          .slice(1)
          .map((x) => `<td>${f2(x)}</td>`)
          .join("")}</tr>`,
    ).join("")}</table></div>` +
    plot({
      t: "Esborso periodico: interessi e rata costitutiva",
      xs: R.map((r) => r[0]),
      stack: 1,
      bars: [
        { n: "Interessi al creditore", c: PAL[1], v: R.map((r) => r[1]) },
        { n: "Rata costitutiva", c: PAL[0], v: R.map((r) => r[2]) },
      ],
      lb: R.map((r) => "Periodo " + r[0]),
    }) +
    plot({
      t: "Costituzione del capitale",
      xs,
      zero: 1,
      lines: [
        { n: "Capitale costituito", c: PAL[2], a: 1, v: fund },
        {
          n: "Debito da rimborsare",
          c: PAL[3],
          d: "5 4",
          v: xs.map(() => C),
        },
      ],
      lb: xs.map((t) => "Periodo " + t),
    }) +
    patrimonio({
      C,
      m,
      vb: v.vb,
      g: v.g,
      debtLbl: "Debito netto (debito − fondo)",
      repLbl: "Capitale costituito",
      intLbl: "Interessi al creditore",
      P: [{ n: 0, tau: 0, debt: C, paid: 0, int: 0 }].concat(
        R.map((r, j) => ({
          n: r[0],
          tau: r[0],
          debt: C - r[4],
          paid: out_ * (j + 1),
          int: I * (j + 1),
        })),
      ),
    })
  );
}
const tbl = (R) =>
  `<div class="tb"><table><tr><th>Rata</th><th>Importo</th><th>Quota capitale</th><th>Quota interessi</th><th>Debito residuo</th></tr>${R.map(
    (r) =>
      `<tr><td>${r[0]}</td>${r
        .slice(1)
        .map((x) => `<td>${f2(x)}</td>`)
        .join("")}</tr>`,
  ).join("")}</table></div>`;
function preCh(C, i, N) {
  const ms = [
      ...new Set(
        [...Array(20)].map((_, j) =>
          Math.max(1, Math.round(N * (0.25 + (1.75 * j) / 19))),
        ),
      ),
    ].sort((a, b) => a - b),
    r = (m) => (i ? (C * i) / (1 - (1 + i) ** -m) : C / m),
    xs = ms.map((m) => m / 12),
    lb = ms.map((m) => m + " mesi");
  return (
    plot({
      t: "Rata mensile al variare della durata (anni)",
      xs,
      lines: [{ n: "Rata mensile", c: PAL[0], a: 1, v: ms.map(r) }],
      marks: [
        {
          x: N / 12,
          y: r(N),
          c: PAL[3],
          l: "La tua scelta: " + N + " mesi, rata " + f2(r(N)),
        },
      ],
      lb,
    }) +
    plot({
      t: "Interessi totali al variare della durata (anni)",
      xs,
      lines: [
        {
          n: "Interessi totali",
          c: PAL[1],
          a: 1,
          v: ms.map((m) => r(m) * m - C),
        },
      ],
      marks: [
        {
          x: N / 12,
          y: r(N) * N - C,
          c: PAL[3],
          l: "La tua scelta: " + N + " mesi, interessi " + f2(r(N) * N - C),
        },
      ],
      lb,
    })
  );
}
