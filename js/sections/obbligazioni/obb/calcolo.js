// Calcolo dei risultati
T.obb.c = function (v) {
  const f = Math.round(v.f),
    N = Math.round(v.n * f),
    F = v.F,
    cf = (F * v.c) / 100 / f;
  if (!(f >= 1) || !(N >= 1 && N <= 2000))
    return ER("Scadenza o frequenza non valide.");
  const pr = (y) => {
    let s = 0;
    for (let k = 1; k <= N; k++)
      s += (cf + (k == N ? F : 0)) * (1 + y) ** (-k / f);
    return s;
  };
  let Y, P;
  if (v.m == "p") {
    Y = v.y / 100;
    P = pr(Y);
  } else {
    P = v.P;
    let lo = -0.99,
      hi = 10;
    if (!(P > 0) || !(pr(lo) >= P) || !(pr(hi) <= P))
      return ER("Rendimento non trovato per questo prezzo.");
    for (let q = 0; q < 120; q++) {
      const mid = (lo + hi) / 2;
      pr(mid) > P ? (lo = mid) : (hi = mid);
    }
    Y = (lo + hi) / 2;
  }
  const a = Math.max(-0.02, Y - 0.06),
    b = Y + 0.06,
    ys = [...Array(41)].map((_, j) => a + ((b - a) * j) / 40);
  return (
    ks([
      K("Prezzo", f2(P), 1),
      K("Rendimento effettivo annuo", f4(Y * 100) + "%"),
      K(
        "Rendimento nominale annuo",
        f4(f * ((1 + Y) ** (1 / f) - 1) * 100) + "%",
      ),
      K("Current yield", f4(((F * v.c) / 100 / P) * 100) + "%"),
      K(
        P > F
          ? "Premio sul nominale"
          : P < F
            ? "Sconto sul nominale"
            : "Alla pari",
        f2(P - F),
      ),
      K("Cedole totali", f2(cf * N)),
    ]) +
    `<p class="note">${P > F ? "Prezzo sopra la pari: cedola maggiore del rendimento." : P < F ? "Prezzo sotto la pari: cedola minore del rendimento." : "Prezzo alla pari: rendimento uguale alla cedola."} Flussi: ${fg(N)} cedole da ${f2(cf)}${N > 0 ? ", rimborso di " + f2(F) + " in coda" : ""}.</p>` +
    plot({
      t: "Prezzo in funzione del rendimento",
      xs: ys.map((y) => y * 100),
      lines: [{ n: "Prezzo", c: PAL[0], a: 1, v: ys.map(pr) }],
      marks: [
        {
          x: Y * 100,
          y: P,
          c: PAL[3],
          l: "Prezzo " + f2(P) + " a " + f2(Y * 100) + "%",
        },
      ],
      xf: (x) => f2(x) + "%",
      lb: ys.map((y) => "Rendimento " + f2(y * 100) + "%"),
    })
  );
};
