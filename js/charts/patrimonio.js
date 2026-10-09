// Situazione patrimoniale di un finanziamento: attivo (bene), passivo (debito) e patrimonio netto
// P = punti del piano: { n: rate pagate, tau: periodi trascorsi, debt: debito, paid: totale versato, int: interessi cumulati }

// Punti patrimoniali da un piano standard R = [k, importo, quota capitale, quota interessi, debito residuo]
function ptsPiano(R, C, t0) {
  const P = [{ n: 0, tau: 0, debt: C, paid: 0, int: 0 }];
  let paid = 0,
    int = 0;
  R.forEach((r, j) => {
    paid += r[1];
    int += r[3];
    P.push({ n: j + 1, tau: t0 ? j + 1 : j, debt: r[4], paid, int });
  });
  return P;
}

function patrimonio(o) {
  const { C, m, P } = o,
    vb = +o.vb || 0,
    g = +o.g || 0,
    A = vb > 0,
    N = P.length - 1,
    dl = o.debtLbl || "Debito residuo",
    rl = o.repLbl || "Capitale rimborsato",
    il = o.intLbl || "Interessi cumulati",
    z = (x) => (Math.abs(x) < 0.005 ? 0 : x),
    row = (p) => {
      p = { ...p, debt: z(p.debt) };
      const a = A ? vb * (1 + g / 100) ** (p.tau / m) : 0;
      return { ...p, a, e: z(a - p.debt), ltv: a > 0 ? (p.debt / a) * 100 : 0, rep: z(C - p.debt) };
    },
    Q = P.map(row),
    pc = (x) => f2(x) + "%",
    cells = (q) =>
      `<td>${q.n}</td>` +
      (A ? `<td>${f2(q.a)}</td>` : "") +
      `<td>${f2(q.debt)}</td>` +
      (A ? `<td>${f2(q.e)}</td><td>${pc(q.ltv)}</td>` : "") +
      `<td>${f2(q.rep)}</td><td>${f2(q.int)}</td><td>${f2(q.paid)}</td>`,
    head =
      `<th>Dopo la rata</th>` +
      (A ? `<th>Valore del bene</th>` : "") +
      `<th>${dl}</th>` +
      (A ? `<th>Patrimonio netto</th><th>Debito/valore</th>` : "") +
      `<th>${rl}</th><th>${il}</th><th>Totale versato</th>`,
    idx = [...new Set([0, 0.25, 0.5, 0.75, 1].map((x) => Math.round(x * N)))],
    mid = Q[Math.round(N / 2)],
    fin = Q[N],
    xs = Q.map((q) => q.n),
    lb = Q.map((q) => "Dopo la rata " + q.n),
    lines = A
      ? [
          { n: "Valore del bene (attivo)", c: PAL[0], v: Q.map((q) => q.a) },
          { n: dl + " (passivo)", c: PAL[3], v: Q.map((q) => q.debt) },
          { n: "Patrimonio netto", c: PAL[2], a: 1, v: Q.map((q) => q.e) },
        ]
      : [
          { n: dl, c: PAL[3], v: Q.map((q) => q.debt) },
          { n: rl, c: PAL[2], a: 1, v: Q.map((q) => q.rep) },
          { n: il, c: PAL[1], d: "5 4", v: Q.map((q) => q.int) },
        ];
  return (
    `<div class="pt"><h3 class="pth"><span class="sy">🧾</span>Situazione patrimoniale</h3>` +
    (A
      ? ks([
          K("Patrimonio netto iniziale", f2(Q[0].e), 1),
          K("Patrimonio netto a metà piano", f2(mid.e)),
          K("Patrimonio netto a fine piano", f2(fin.e)),
          K("Rivalutazione meno interessi", f2(fin.a - vb - fin.int)),
        ]) +
        `<p class="note">Attivo = valore del bene (rivalutato del ${f2(g)}% annuo), passivo = ${dl.toLowerCase()}, patrimonio netto = attivo − passivo. «Rivalutazione meno interessi» è la variazione di ricchezza a fine piano: quanto il bene è cresciuto di valore meno quanto hai pagato di interessi.</p>`
      : `<p class="note">Inserisci il «Valore del bene finanziato» per vedere anche attivo, patrimonio netto e rapporto debito/valore. Qui sotto la sola posizione debitoria.</p>`) +
    `<div class="tb"><table><tr>${head}</tr>${idx.map((j) => `<tr>${cells(Q[j])}</tr>`).join("")}</table></div>` +
    plot({
      t: A ? "Attivo, passivo e patrimonio netto" : "Debito, capitale rimborsato e interessi",
      xs,
      zero: 1,
      lines,
      lb,
    }) +
    `<details class="ptd"><summary>Prospetto patrimoniale completo, rata per rata</summary><div class="tb"><table><tr>${head}</tr>${Q.map((q) => `<tr>${cells(q)}</tr>`).join("")}</table></div></details></div>`
  );
}
