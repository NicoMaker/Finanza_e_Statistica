// Campi del modulo di input
T.pre.f = [
  { k: "C", l: "Importo del prestito (€)", v: 10000 },
  { k: "r", l: "TAN – tasso annuo nominale (%)", v: 7 },
  { k: "n", l: "Durata", v: 60 },
  {
    k: "nu",
    l: "Unità di durata",
    t: "s",
    o: [
      [1, "Mesi"],
      [12, "Anni"],
    ],
    v: 1,
  },
  { k: "w", l: "Reddito netto mensile (€, facoltativo)", v: 0 },
  { k: "e", l: "Spese di istruttoria (€, per il TAEG)", v: 0 },
  { k: "ei", l: "Spese di incasso per rata (€, per il TAEG)", v: 0 },
  {
    k: "k",
    l: "Simulazione tasso variabile: rate già pagate",
    v: 12,
  },
  { k: "r2", l: "Nuovo TAN dopo le rate pagate (%)", v: 9 },
];
