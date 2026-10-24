// Calcolo dei risultati
T.ren.c = function (v) {
  const i = v.i / 100,
    R = v.R,
    g = v.g / 100;
  if (v.m == "p" || v.m == "c") {
    const gg = v.m == "c" ? g : 0;
    if (!(i > gg) || i <= 0)
      return ER(
        v.m == "c" ? "Serve i > g > −100%." : "Serve un tasso positivo.",
      );
    const V = R / (i - gg),
      L = Math.min(300, Math.max(20, Math.ceil(4 / (i - gg)))),
      xs = [...Array(L)].map((_, k) => k + 1);
    let A = 0;
    const cum = xs.map((k) => (A += R * (1 + gg) ** (k - 1) * (1 + i) ** -k));
    return (
      ks([
        K("Valore attuale", f2(V), 1),
        K("Rata / valore", f4((R / V) * 100) + "%"),
        K("Duration di Macaulay", f4((1 + i) / (i - gg)) + " periodi"),
      ]) +
      `<p class="note">Rendita illimitata: il valore è la somma di infiniti termini che convergono.</p>` +
      plot({
        t: "Somma dei valori attuali che converge",
        xs,
        zero: 1,
        lines: [
          { n: "Somma parziale", c: PAL[0], a: 1, v: cum },
          {
            n: "Valore limite",
            c: PAL[1],
            d: "5 4",
            v: xs.map(() => V),
          },
        ],
        lb: xs.map((k) => fg(k) + " rate"),
      })
    );
  }
  const n = Math.round(v.n),
    s = Math.round(v.s) || 0;
  if (!(n >= 1 && n <= 1000) || s < 0 || i <= -1)
    return ER("Numero di rate non valido.");
  let fl =
    v.m == "a"
      ? Array.from({ length: n }, (_, k) => R + k * v.D)
      : v.m == "g"
        ? Array.from({ length: n }, (_, k) => R * (1 + g) ** k)
        : Array(n).fill(R);
  if (v.m == "d") fl = Array(s).fill(0).concat(fl);
  const N = fl.length,
    pv = fl.reduce((a, x, k) => a + x * (1 + i) ** -(k + 1), 0);
  return (
    ks([
      K("Valore attuale", f2(pv), 1),
      K("Montante (t=" + fg(N) + ")", f2(pv * (1 + i) ** N)),
      K("Totale rate", f2(fl.reduce((a, x) => a + x, 0))),
      K("Ultima rata", f2(fl[N - 1])),
    ]) +
    `<p class="note">Rate posticipate (t = 1 … ${fg(N)}).${v.m == "d" ? " Le prime " + fg(s) + " epoche hanno rata nulla." : ""}</p>` +
    rendCh(fl, i, 1)
  );
};
