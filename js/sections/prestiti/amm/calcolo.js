// Calcolo dei risultati
T.amm.c = function (v) {
  const m = +v.m,
    N = Math.round(v.n * m),
    i = (1 + v.r / 100) ** (1 / m) - 1,
    C = v.C,
    R = [];
  let E = C,
    t0 = 1;
  if (N < 1 || N > 600) return '<p class="err">Durata non valida.</p>';
  if (v.t == "am" && v.ric == "s") return ricPlan(v, N, i);
  if (v.t == "fr") {
    const p = (C * i) / (1 - (1 + i) ** -N) || C / N;
    for (let k = 1; k <= N; k++) {
      const I = E * i,
        Q = p - I;
      E -= Q;
      R.push([k, p, Q, I, E]);
    }
  }
  if (v.t == "it") {
    const Q = C / N;
    for (let k = 1; k <= N; k++) {
      const I = E * i;
      E -= Q;
      R.push([k, Q + I, Q, I, E]);
    }
  }
  if (v.t == "am") {
    for (let k = 1; k <= N; k++) {
      const I = C * i,
        Q = k == N ? C : 0;
      E = C - Q;
      R.push([k, I + Q, Q, I, E]);
    }
  }
  if (v.t == "de") {
    t0 = 0;
    const d = i / (1 + i),
      p = (C * d) / (1 - (1 - d) ** N) || C / N;
    for (let k = 0; k < N; k++) {
      const I = i * (E - p),
        Q = p - I;
      E -= Q;
      R.push([k, p, Q, I, Math.max(E, 0)]);
    }
  }
  const tot = R.reduce((a, r) => a + r[1], 0),
    ti = tot - C;
  return (
    ks([
      K(
        v.t == "fr" || v.t == "de" ? "Rata costante" : "Prima rata",
        f2(R[0][1]),
        1,
      ),
      K("Totale interessi", f2(ti)),
      K("Totale pagato", f2(tot)),
      K("Tasso periodale", f4(i * 100) + "%"),
    ]) +
    (v.t == "de"
      ? '<p class="note">Interessi anticipati: le rate sono pagate all\'inizio di ogni periodo (t = 0 … n−1).</p>'
      : "") +
    (v.t == "am"
      ? '<p class="note">Per vedere il prospetto con la rata costitutiva del capitale, scegli «Sì» in «Prospetto con rata costitutiva».</p>'
      : "") +
    `<div class="tb"><table><tr><th>${t0 ? "Rata" : "Epoca t"}</th><th>Importo</th><th>Quota capitale</th><th>Quota interessi</th><th>Debito residuo</th></tr>${R.map(
      (r) =>
        `<tr><td>${fg(r[0])}</td>${r
          .slice(1)
          .map((x) => `<td>${f2(x)}</td>`)
          .join("")}</tr>`,
    ).join("")}</table></div>` +
    ammCh(R, C, t0, ti) +
    patrimonio({ C, m, vb: v.vb, g: v.g, P: ptsPiano(R, C, t0) })
  );
};
