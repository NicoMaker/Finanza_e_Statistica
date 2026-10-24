// Campi del modulo di input
T.pac.f = [
  {
    k: "m",
    l: "Cosa calcolare",
    t: "s",
    o: [
      ["m", "Montante finale"],
      ["r", "Versamento periodico necessario"],
      ["t", "Tempo per raggiungere l’obiettivo"],
    ],
    v: "m",
  },
  { k: "C0", l: "Capitale iniziale (€)", v: 1000 },
  {
    k: "R",
    l: "Versamento periodico (€)",
    v: 200,
    s: (v) => v.m != "r",
  },
  { k: "G", l: "Obiettivo (€)", v: 50000, s: (v) => v.m != "m" },
  { k: "r", l: "Tasso annuo effettivo (%)", v: 4 },
  { k: "n", l: "Durata (anni)", v: 10, s: (v) => v.m != "t" },
  {
    k: "f",
    l: "Versamenti per anno",
    t: "s",
    o: [
      [1, "Annuali"],
      [2, "Semestrali"],
      [4, "Trimestrali"],
      [12, "Mensili"],
    ],
    v: 12,
  },
  {
    k: "p",
    l: "Versamenti",
    t: "s",
    o: [
      ["p", "Posticipati (fine periodo)"],
      ["a", "Anticipati (inizio periodo)"],
    ],
    v: "p",
  },
];
