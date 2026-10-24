BL.sell = (sym, qty, reason) => {
  const S = BL.S,
    pos = S.pos[sym];
  if (!pos || pos.qty < qty) return;
  const price = S.prices[sym],
    revenue = price * qty,
    pnl = revenue - pos.avg * qty;
  S.cash += revenue;
  pos.qty -= qty;
  if (pos.qty === 0) delete S.pos[sym];
  if (pnl > 0) S.wins++;
  else S.losses++;
  S.trades.push({ side: "SELL", sym, qty, price, pnl });
  BL.addLog(
    "sell",
    `🔴 Venduti ${fg(qty)} ${sym} (${pnl < 0 ? "-" : "+"}${BLF.usd(Math.abs(pnl))})`,
    `${reason} — Prezzo: ${BLF.usd(price)} · Ricavo: ${BLF.usd(revenue)}`,
  );
};
