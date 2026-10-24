BL.decide = () => {
  const S = BL.S,
    m = BL_STRATEGIE[S.mode],
    open = Object.keys(S.pos),
    tv = BL.total(),
    cashPct = S.cash / tv;

  // 1. Vendite: take profit o stop loss, r = (P − Pm)/Pm · 100
  for (const sym of open) {
    const pos = S.pos[sym],
      r = ((S.prices[sym] - pos.avg) / pos.avg) * 100;
    if (r >= m.sellThreshold) {
      BL.sell(
        sym,
        pos.qty,
        `Take profit: +${f2(r)}% (soglia ${m.sellThreshold}%)`,
      );
      return;
    }
    if (r <= ROBOT.stopLoss) {
      BL.sell(sym, pos.qty, `Stop loss: ${f2(r)}% (limite ${ROBOT.stopLoss}%)`);
      return;
    }
  }

  // 2. Acquisti: titolo con il calo maggiore negli ultimi N passi (ROBOT.finestraAcquisto)
  if (open.length >= m.maxPositions || cashPct <= m.cashTarget) return;
  let best = null,
    bestCh = 0;
  BL_TITOLI.forEach((s) => {
    if (S.pos[s.symbol]) return;
    const h = S.hist[s.symbol];
    const n = ROBOT.finestraAcquisto;
    if (h.length < n) return;
    const ch = ((h[h.length - 1] - h[h.length - n]) / h[h.length - n]) * 100;
    if (ch < m.buyThreshold && ch < bestCh) {
      bestCh = ch;
      best = s.symbol;
    }
  });
  if (best) {
    const avail = Math.min(tv * m.tradeSize, S.cash - tv * m.cashTarget);
    if (avail > ROBOT.importoMinimo) {
      const qty = Math.floor(avail / S.prices[best]);
      if (qty > 0) {
        BL.buy(
          best,
          qty,
          `Calo del ${f2(bestCh)}% — opportunità di acquisto (soglia ${m.buyThreshold}%)`,
        );
        return;
      }
    }
  }

  // 3. Nessuna azione
  if (Math.random() < ROBOT.probabilitaAttesa) {
    const th = ROBOT.messaggiAttesa;
    BL.addLog(
      "hold",
      "⏸️ In attesa",
      th[Math.floor(Math.random() * th.length)],
    );
  }
};
