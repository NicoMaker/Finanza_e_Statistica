// Calcolo dei risultati
T.reg.c = function (v) {
  const C = v.C,
    t = v.t,
    i = v.i / 100,
    d = v.d / 100;
  if (!(t >= 0) || i <= -1) return ER("Tempo o tasso non validi.");
  const T0 = t > 0 ? t : 1,
    xs = [...Array(41)].map((_, j) => (T0 * j) / 40);
  return (
    ks([
      K("Montante semplice", f2(C * (1 + i * t)), 1),
      K("Montante composto", f2(C * (1 + i) ** t)),
      K("Valore attuale razionale", f2(C / (1 + i * t))),
      K("Valore attuale commerciale", f2(C * (1 - d * t))),
      K("Valore attuale composto", f2(C * (1 + i) ** -t)),
      K("Sconto commerciale", f2(C * d * t)),
      K("d equivalente a i", f4((i / (1 + i * t)) * 100) + "%"),
    ]) +
    (d * t >= 1
      ? '<p class="err">Con d·t ≥ 1 lo sconto commerciale non ha senso (valore ≤ 0).</p>'
      : '<p class="note">Dopo 1 anno semplice e composto coincidono; prima il semplice rende di più, dopo il composto. Lo sconto commerciale usa d, quello razionale e composto usano i.</p>') +
    plot({
      t: "Montante: regime semplice e composto",
      xs,
      zero: 1,
      lines: [
        {
          n: "Semplice",
          c: PAL[1],
          d: "5 4",
          v: xs.map((x) => C * (1 + i * x)),
        },
        {
          n: "Composto",
          c: PAL[0],
          a: 1,
          v: xs.map((x) => C * (1 + i) ** x),
        },
      ],
      lb: xs.map((x) => "t = " + sh(x)),
    }) +
    plot({
      t: "Valore attuale: tre tipi di sconto",
      xs,
      zero: 1,
      lines: [
        {
          n: "Razionale",
          c: PAL[1],
          v: xs.map((x) => C / (1 + i * x)),
        },
        {
          n: "Commerciale",
          c: PAL[3],
          d: "5 4",
          v: xs.map((x) => Math.max(0, C * (1 - d * x))),
        },
        {
          n: "Composto",
          c: PAL[0],
          a: 1,
          v: xs.map((x) => C * (1 + i) ** -x),
        },
      ],
      lb: xs.map((x) => "t = " + sh(x)),
    })
  );
};
