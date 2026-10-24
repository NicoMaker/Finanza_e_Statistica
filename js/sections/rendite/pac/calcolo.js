// Calcolo dei risultati
T.pac.c = function (v) {
  const f = +v.f,
    i = (1 + v.r / 100) ** (1 / f) - 1,
    u = v.p == "a" ? 1 + i : 1,
    sN = (N) => (i ? ((1 + i) ** N - 1) / i : N);
  let N = Math.round(v.n * f),
    R = v.R;
  if (v.m == "t") {
    if (!(v.R > 0)) return ER("Il versamento deve essere positivo.");
    const Nn = i
      ? Math.log((v.G * i + v.R * u) / (v.C0 * i + v.R * u)) / Math.log(1 + i)
      : (v.G - v.C0) / v.R;
    if (!isFinite(Nn) || Nn < 0)
      return ER("Obiettivo non raggiungibile con questi dati.");
    N = Math.max(1, Math.ceil(Nn - 1e-9));
  }
  if (v.m == "r") R = (v.G - v.C0 * (1 + i) ** N) / (u * sN(N));
  if (!(N >= 1 && N <= 1200))
    return ER("Durata non valida (da 1 a 1.200 versamenti).");
  const B = [v.C0],
    V = [v.C0];
  let b = v.C0;
  for (let k = 1; k <= N; k++) {
    b = v.p == "a" ? (b + R) * (1 + i) : b * (1 + i) + R;
    B.push(b);
    V.push(v.C0 + R * k);
  }
  const M = B[N],
    vers = V[N];
  return (
    ks([
      K("Montante finale", f2(M), 1),
      K(v.m == "r" ? "Versamento necessario" : "Versamento periodico", f2(R)),
      K("Totale versato", f2(vers)),
      K("Interessi maturati", f2(M - vers)),
      K("Numero versamenti", fg(N)),
      K("Durata", f2(N / f) + " anni"),
      K("Tasso periodale", f4(i * 100) + "%"),
    ]) +
    (v.m == "r" && R < 0
      ? '<p class="note">Il capitale iniziale basta già a superare l’obiettivo: il versamento risulta negativo.</p>'
      : "") +
    plot({
      t: "Crescita del capitale",
      xs: B.map((_, k) => k),
      stack: 1,
      bars: [
        { n: "Totale versato", c: PAL[0], v: V },
        {
          n: "Interessi maturati",
          c: PAL[1],
          v: B.map((x, k) => x - V[k]),
        },
      ],
      lb: B.map((_, k) => "Periodo " + fg(k)),
    })
  );
};
