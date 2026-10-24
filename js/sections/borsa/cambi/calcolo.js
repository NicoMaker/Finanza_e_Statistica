// Calcolo dei risultati
T.cv.c = function (v) {
  const A = ctyOf(v.p1),
    B = ctyOf(v.p2),
    R = remote(CFG.cambi.api.replace("{valuta}", A[2]));
  if (R.st == "load")
    return `<p class="note">Caricamento dei tassi di cambio…</p>`;
  if (R.st == "err" || !R.d || !R.d.rates)
    return ER("Tassi non disponibili: controlla la connessione.");
  const r = R.d.rates[B[2]];
  if (!r) return ER("Valuta di arrivo non disponibile.");
  const maj = CFG.cambi.valutePrincipali.filter((c) => R.d.rates[c]);
  return (
    `<p class="cvp">${ctyFlag(A[0])}<b>${A[1]}</b> ${curName(A[2])} (${A[2]}) <span>→</span> ${ctyFlag(B[0])}<b>${B[1]}</b> ${curName(B[2])} (${B[2]})</p>` +
    ks([
      K(`${f2(v.a)} ${A[2]} valgono`, `${f2(v.a * r)} ${B[2]}`, 1),
      K(`1 ${A[2]}`, `${f4(r)} ${B[2]}`),
      K(`1 ${B[2]}`, `${f4(1 / r)} ${A[2]}`),
      K("Aggiornamento", R.d.date || "—"),
    ]) +
    TB(
      [A[2], B[2]],
      [1, 10, 100, 1000, 10000].map((x) => [f2(x), f2(x * r)]),
    ) +
    plot({
      t: `${f2(v.a)} ${A[2]} nelle principali valute`,
      xs: maj.map((_, i) => i),
      bars: [
        {
          n: "Controvalore",
          c: PAL[0],
          v: maj.map((c) => v.a * R.d.rates[c]),
        },
      ],
      xf: (i) => maj[Math.round(i)] || "",
      lb: maj.map((c) => c + " · " + curName(c)),
    })
  );
};
