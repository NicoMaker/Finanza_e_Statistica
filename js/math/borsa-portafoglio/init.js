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
