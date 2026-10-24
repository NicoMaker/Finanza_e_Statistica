// Campi del modulo di input (getter: riaprendo la scheda riflettono lo stato attuale)
Object.defineProperty(T.bl, "f", {
  enumerable: true,
  configurable: true,
  get: function () {
    return [
      {
        k: "m",
        l: "Strategia del robot",
        t: "s",
        o: Object.entries(BL_STRATEGIE).map(([k, s]) => [k, s.etichetta]),
        v: BL.S.mode,
      },
      { k: "cap", l: "Capitale iniziale (€)", v: BL.S.cap0 },
    ];
  },
});
