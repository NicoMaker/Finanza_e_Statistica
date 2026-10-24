// Calcolo dei risultati
T.imm.c = function (v) {
  const { L, H, t1, t2 } = v,
    y = v.y / 100;
  if (!(t1 > 0 && t1 < H && H < t2)) return ER("Servono 0 < T₁ < H < T₂.");
  const PV = L / (1 + y) ** H,
    w1 = (t2 - H) / (t2 - t1),
    w2 = 1 - w1,
    F1 = w1 * PV * (1 + y) ** t1,
    F2 = w2 * PV * (1 + y) ** t2,
    Ca = (w1 * t1 * (t1 + 1) + w2 * t2 * (t2 + 1)) / (1 + y) ** 2,
    Cl = (H * (H + 1)) / (1 + y) ** 2,
    Fs = PV * (1 + y) ** t2,
    sh = [-3, -2, -1, -0.5, 0, 0.5, 1, 2, 3],
    val = (s) =>
      F1 * (1 + y + s / 100) ** (H - t1) + F2 * (1 + y + s / 100) ** (H - t2),
    sole = (s) => Fs * (1 + y + s / 100) ** (H - t2);
  return (
    ks([
      K("Da investire oggi", f2(PV), 1),
      K("Peso titolo T₁", f2(w1 * 100) + "%"),
      K("Peso titolo T₂", f2(w2 * 100) + "%"),
      K("Valore nominale T₁", f2(F1)),
      K("Valore nominale T₂", f2(F2)),
    ]) +
    ks([
      K("Duration attivo", f4(w1 * t1 + w2 * t2) + " anni"),
      K("Convessità attivo", f4(Ca)),
      K("Convessità passivo", f4(Cl)),
      K("Redington", Ca >= Cl ? "✔ soddisfatta" : "✘ non soddisfatta"),
    ]) +
    TB(
      ["Shock Δi", "Attivo a H", "Surplus immunizzato", "Surplus solo T₂"],
      sh.map((s) => [
        (s > 0 ? "+" : "") + s + "%",
        f2(val(s)),
        f2(val(s) - L),
        f2(sole(s) - L),
      ]),
    ) +
    `<p class="note">Con duration dell'attivo uguale all'orizzonte e convessità maggiore, ogni variazione parallela del tasso lascia un surplus ≥ 0; investire tutto in T₂ espone al rischio di prezzo.</p>` +
    plot({
      t: "Surplus a H dopo uno shock dei tassi",
      xs: sh,
      zero: 1,
      lines: [
        { n: "Immunizzato", c: PAL[2], a: 1, v: sh.map((s) => val(s) - L) },
        { n: "Solo T₂", c: PAL[3], d: "5 4", v: sh.map((s) => sole(s) - L) },
      ],
      xf: (p) => p + "%",
      lb: sh.map((s) => "Δi = " + s + "%"),
    })
  );
};
