// Campi del modulo di input
T.dur.f = [
  { k: "F", l: "Valore nominale (€)", v: 1000 },
  { k: "c", l: "Cedola annua (%)", v: 5 },
  { k: "a", l: "Scadenza", v: 5 },
  {
    k: "au",
    l: "Unità di scadenza",
    t: "s",
    o: [
      [1, "Anni"],
      [1 / 12, "Mesi"],
      [7 / 365, "Settimane"],
      [1 / 365, "Giorni"],
    ],
    v: 1,
  },
  { k: "p", l: "Frequenza cedola: numero a scelta", v: 1 },
  {
    k: "pu",
    l: "Il numero indica…",
    t: "s",
    o: [
      ["f", "Cedole all'anno (es. 12 = mensili)"],
      [1 / 12, "Cedola ogni N mesi"],
      [7 / 365, "Cedola ogni N settimane"],
      [1 / 365, "Cedola ogni N giorni"],
      [1, "Cedola ogni N anni"],
    ],
    v: "f",
  },
  { k: "y", l: "Rendimento annuo effettivo (%)", v: 4 },
  { k: "dr", l: "Variazione del tasso Δr (punti %)", v: 1 },
];
