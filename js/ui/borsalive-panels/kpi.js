// Borsa Live · pannelli dell'interfaccia (KPI, strategia, posizioni, diario), aggiornamento e messaggi
BL.kpi = () => {
  const S = BL.S,
    t = BL.total(),
    p = ((t - S.cap0) / S.cap0) * 100,
    n = S.wins + S.losses;
  return ks([
    K("Capitale", BLF.eu(t), 1),
    K(
      "P&amp;L",
      `<span class="bl-${p >= 0 ? "up" : "dn"}">${BLF.sg(p)}${f2(p)}%</span>`,
    ),
    K("Operazioni", fg(S.trades.length)),
    K("Win rate", n ? Math.round((S.wins / n) * 100) + "%" : "—"),
    K("Cash", BLF.eu(S.cash)),
    K("Posizioni", fg(Object.keys(S.pos).length)),
  ]);
};
