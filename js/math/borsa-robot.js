// Borsa Live · il robot: variazione dei prezzi simulati e decisioni di acquisto/vendita
BL.updatePrices = () => {
  const S = BL.S;
  BL_TITOLI.forEach((s) => {
    const drift = (Math.random() - 0.5) * 0.01 * s.volatility,
      p = S.prices[s.symbol] * (1 + drift);
    S.prices[s.symbol] = p;
    S.hist[s.symbol].push(p);
    if (S.hist[s.symbol].length > 100) S.hist[s.symbol].shift();
  });
};

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
    if (r <= -6) {
      BL.sell(sym, pos.qty, `Stop loss: ${f2(r)}% (limite -6%)`);
      return;
    }
  }

  // 2. Acquisti: titolo con il calo maggiore negli ultimi 5 passi
  if (open.length >= m.maxPositions || cashPct <= m.cashTarget) return;
  let best = null,
    bestCh = 0;
  BL_TITOLI.forEach((s) => {
    if (S.pos[s.symbol]) return;
    const h = S.hist[s.symbol];
    if (h.length < 5) return;
    const ch = ((h[h.length - 1] - h[h.length - 5]) / h[h.length - 5]) * 100;
    if (ch < m.buyThreshold && ch < bestCh) {
      bestCh = ch;
      best = s.symbol;
    }
  });
  if (best) {
    const avail = Math.min(tv * m.tradeSize, S.cash - tv * m.cashTarget);
    if (avail > 100) {
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
  if (Math.random() < 0.3) {
    const th = [
      "Mercato stabile, nessuna opportunità evidente. Rimango in attesa.",
      "Prezzi in range, preferisco non rischiare. Cash ready.",
      "Analisi completata: nessun segnale forte. Aspetto.",
      "Volatilità nella norma, mantengo la strategia.",
    ];
    BL.addLog(
      "hold",
      "⏸️ In attesa",
      th[Math.floor(Math.random() * th.length)],
    );
  }
};

// Un passo della simulazione: nuovi prezzi, decisione, punto sulla curva del capitale
BL.passo = () => {
  BL.updatePrices();
  BL.decide();
  BL.S.curve.push(BL.total());
  if (BL.S.curve.length > 100) BL.S.curve.shift();
};

// Liquida tutte le posizioni aperte; restituisce quante ne ha chiuse
BL.liquida = () => {
  const open = Object.keys(BL.S.pos);
  open.forEach((s) =>
    BL.sell(s, BL.S.pos[s].qty, "Liquidazione manuale richiesta dall'utente"),
  );
  return open.length;
};
