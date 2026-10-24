// Liquida tutte le posizioni aperte; restituisce quante ne ha chiuse
BL.liquida = () => {
  const open = Object.keys(BL.S.pos);
  open.forEach((s) =>
    BL.sell(s, BL.S.pos[s].qty, "Liquidazione manuale richiesta dall'utente"),
  );
  return open.length;
};
