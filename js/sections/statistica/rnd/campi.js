// Campi del modulo di input
T.rnd.f = [
  {
    k: "pr",
    l: "Prezzi (separati da ; o a capo)",
    t: "a",
    v: "100; 102; 101; 105; 107; 104; 110; 112",
  },
  {
    k: "fr",
    l: "Periodicità dei prezzi",
    t: "s",
    o: [
      [252, "Giornaliera (252 / anno)"],
      [52, "Settimanale (52 / anno)"],
      [12, "Mensile (12 / anno)"],
      [4, "Trimestrale (4 / anno)"],
      [1, "Annuale (1 / anno)"],
    ],
    v: 12,
  },
  { k: "rf", l: "Tasso privo di rischio annuo (%)", v: 2 },
  {
    k: "z",
    l: "Confidenza del VaR",
    t: "s",
    o: [
      [1.645, "95%"],
      [2.326, "99%"],
    ],
    v: 1.645,
  },
];
