// Borsa Live · portafoglio virtuale: stato, diario, valore totale, acquisti e vendite
// BL è lo spazio dei nomi condiviso dai file di Borsa Live (BL.S = stato del robot)
const BL = { S: { mode: "balanced", cap0: 10000, warm: 0 } };

// Riparte da zero con il capitale indicato
BL.init = (cap) => {
  const S = BL.S;
  S.cap0 = cap;
  S.cash = cap;
  S.pos = {}; // { SYMBOL: { qty, avg } }
  S.prices = {};
  S.hist = {}; // storico prezzi per ogni titolo
  S.curve = [cap]; // valore totale nel tempo
  S.trades = [];
  S.wins = 0;
  S.losses = 0;
  S.log = [];
  BL_TITOLI.forEach((s) => {
    S.prices[s.symbol] = s.price;
    S.hist[s.symbol] = [s.price];
  });
  BL.addLog(
    "info",
    "🤖 Robot avviato",
    `Capitale iniziale: ${BLF.eu(cap)}. Modalità: ${BL_STRATEGIE[S.mode].name}`,
  );
};

BL.addLog = (type, title, reason) => {
  const L = BL.S.log;
  L.unshift({ type, title, reason, time: new Date() });
  if (L.length > 50) L.pop();
};

// V = C + Σ q·P
BL.holdings = () =>
  Object.entries(BL.S.pos).reduce((a, [s, p]) => a + BL.S.prices[s] * p.qty, 0);
BL.total = () => BL.S.cash + BL.holdings();

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
    `🟢 Acquistati ${qty} ${sym}`,
    `${reason} — Prezzo: ${BLF.usd(price)} · Costo: ${BLF.usd(cost)}`,
  );
};

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
    `🔴 Venduti ${qty} ${sym} (${pnl < 0 ? "-" : "+"}${BLF.usd(Math.abs(pnl))})`,
    `${reason} — Prezzo: ${BLF.usd(price)} · Ricavo: ${BLF.usd(revenue)}`,
  );
};
