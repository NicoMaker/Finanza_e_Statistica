// V = C + Σ q·P
BL.holdings = () =>
  Object.entries(BL.S.pos).reduce((a, [s, p]) => a + BL.S.prices[s] * p.qty, 0);
