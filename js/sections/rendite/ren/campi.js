// Campi del modulo di input
T.ren.f = [
  {
    k: "m",
    l: "Tipo di rendita",
    t: "s",
    o: [
      ["p", "Perpetua (rata costante)"],
      ["c", "Perpetua crescente (Gordon)"],
      ["d", "Differita (rata costante)"],
      ["a", "Crescente aritmetica"],
      ["g", "Crescente geometrica"],
    ],
    v: "p",
  },
  { k: "R", l: "Prima rata (€)", v: 1000 },
  { k: "i", l: "Tasso per periodo (%)", v: 4 },
  {
    k: "n",
    l: "Numero di rate",
    v: 10,
    s: (v) => v.m != "p" && v.m != "c",
  },
  {
    k: "s",
    l: "Periodi di differimento",
    v: 3,
    s: (v) => v.m == "d",
  },
  {
    k: "g",
    l: "Tasso di crescita g (%)",
    v: 2,
    s: (v) => v.m == "c" || v.m == "g",
  },
  {
    k: "D",
    l: "Incremento per rata Δ (€)",
    v: 100,
    s: (v) => v.m == "a",
  },
];
