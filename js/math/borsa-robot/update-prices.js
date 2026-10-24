// Borsa Live · il robot: variazione dei prezzi simulati e decisioni di acquisto/vendita
BL.updatePrices = () => {
  const S = BL.S;
  BL_TITOLI.forEach((s) => {
    const drift =
        (Math.random() - 0.5) * ROBOT.variazionePrezzoBase * s.volatility,
      p = S.prices[s.symbol] * (1 + drift);
    S.prices[s.symbol] = p;
    S.hist[s.symbol].push(p);
    if (S.hist[s.symbol].length > ROBOT.maxPuntiStorico)
      S.hist[s.symbol].shift();
  });
};
