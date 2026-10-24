// Campi del modulo di input
T.amm.f = [
  { k: "C", l: "Capitale (€)", v: 100000 },
  { k: "r", l: "Tasso annuo effettivo (%)", v: 4 },
  { k: "n", l: "Durata (anni)", v: 10 },
  {
    k: "m",
    l: "Rate per anno",
    t: "s",
    o: [
      [1, "Annuale"],
      [2, "Semestrale"],
      [4, "Trimestrale"],
      [12, "Mensile"],
    ],
    v: 12,
  },
  {
    k: "t",
    l: "Metodo",
    t: "s",
    o: [
      ["fr", "Francese (rata costante)"],
      ["it", "Italiano (quota capitale costante)"],
      ["de", "Tedesco (interessi anticipati)"],
      ["am", "Americano (rimborso a scadenza)"],
    ],
    v: "fr",
  },
  {
    k: "ric",
    l: "Prospetto con rata costitutiva del capitale",
    t: "s",
    o: [
      ["n", "No (solo interessi)"],
      ["s", "Sì (fondo di ricostituzione)"],
    ],
    v: "s",
    s: (v) => v.t == "am",
  },
  {
    k: "rr",
    l: "Tasso annuo effettivo di ricostituzione (%)",
    v: 3,
    s: (v) => v.t == "am" && v.ric == "s",
  },
  {
    k: "vb",
    l: "Valore del bene finanziato (€) — per il patrimonio",
    v: 125000,
  },
  { k: "g", l: "Rivalutazione annua del bene (%)", v: 0 },
];
