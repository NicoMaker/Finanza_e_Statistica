// Campi del modulo di input
T.val.f = [
  {
    k: "m",
    l: "Operazione",
    t: "s",
    o: [
      ["s", "Somma singola"],
      ["c", "Rendita a rata costante"],
      ["v", "Rendita a rate variabili"],
    ],
    v: "c",
  },
  { k: "C", l: "Importo / rata (€)", v: 1000, s: (v) => v.m != "v" },
  {
    k: "fl",
    l: "Rate (separate da ; o a capo)",
    t: "a",
    v: "1000; 1200; 1500; 1800",
    s: (v) => v.m == "v",
  },
  { k: "n", l: "Durata (periodi)", v: 5, s: (v) => v.m != "v" },
  { k: "i", l: "Tasso per periodo (%)", v: 3 },
  {
    k: "p",
    l: "Rate",
    t: "s",
    o: [
      ["p", "Posticipate (fine periodo)"],
      ["a", "Anticipate (inizio periodo)"],
    ],
    v: "p",
    s: (v) => v.m != "s",
  },
];
