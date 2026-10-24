// Campi del modulo di input
T.obb.f = [
  {
    k: "m",
    l: "Cosa calcolare",
    t: "s",
    o: [
      ["p", "Prezzo dal rendimento"],
      ["y", "Rendimento (YTM) dal prezzo"],
    ],
    v: "p",
  },
  { k: "F", l: "Valore nominale (€)", v: 1000 },
  { k: "c", l: "Cedola annua (%)", v: 4 },
  { k: "n", l: "Scadenza (anni)", v: 5 },
  { k: "f", l: "Cedole all’anno", v: 1 },
  {
    k: "y",
    l: "Rendimento annuo effettivo (%)",
    v: 3,
    s: (v) => v.m == "p",
  },
  {
    k: "P",
    l: "Prezzo di mercato (€)",
    v: 1050,
    s: (v) => v.m == "y",
  },
];
