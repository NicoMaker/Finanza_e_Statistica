BL.buy = (sym, qty, reason) => {
  const S = BL.S,
    price = S.prices[sym],
    cost = price * qty;
  if (cost > S.cash) return;
  S.cash -= cost;
  S.pos[sym] = { qty, avg: price };
  S.trades.push({ side: "BUY", sym, qty, price });
  BL.addLog(
    "buy",
    `🟢 Acquistati ${fg(qty)} ${sym}`,
    `${reason} — Prezzo: ${BLF.usd(price)} · Costo: ${BLF.usd(cost)}`,
  );
};
