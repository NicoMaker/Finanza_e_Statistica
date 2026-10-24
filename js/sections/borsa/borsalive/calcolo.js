// Calcolo dei risultati
T.bl.c = function (v) {
  const S = BL.S,
    cap = Math.round(v.cap);
  if (cap >= ROBOT.capitaleMinimo && cap !== S.cap0) BL.init(cap); // nuovo capitale: riparte da zero
  if (v.m != S.mode && BL_STRATEGIE[v.m]) {
    S.mode = v.m;
    BL.addLog(
      "info",
      "🔄 Strategia cambiata",
      `Nuova modalità: ${BL_STRATEGIE[v.m].name}`,
    );
  }
  if (!S.warm) {
    S.warm = 1;
    setTimeout(() => blLive() && BL.tick(), ROBOT.primaDecisioneMs); // prima decisione
  }
  return BL.page();
};
