// Campi del modulo di input
T.prb.f = [
  {
    k: "tp",
    l: "Caso di probabilità",
    t: "s",
    o: [
      ["cl", "Classica (favorevoli / possibili)"],
      ["ca", "Carte da gioco (un asso, un seme…)"],
      ["ev", "Eventi A e B (unione, intersezione)"],
      ["ba", "Probabilità totali e Bayes"],
      ["bi", "Binomiale (con reinserimento)"],
      ["ip", "Ipergeometrica (senza reinserimento)"],
      ["lo", "Lotterie (n su N numeri)"],
      ["ge", "Geometrica (primo successo)"],
      ["po", "Poisson (eventi rari)"],
      ["ur", "Urna a più colori"],
      ["da", "Dadi (somma)"],
      ["va", "Valore atteso e varianza"],
      ["no", "Normale"],
    ],
    v: "cl",
  },
  /* classica */
  { k: "fa", l: "Casi favorevoli", v: 4, s: (v) => v.tp == "cl" },
  {
    k: "pos",
    l: "Casi possibili (tutti equiprobabili)",
    v: 52,
    s: (v) => v.tp == "cl",
  },
  /* carte */
  {
    k: "mz",
    l: "Mazzo",
    t: "s",
    o: [
      ["52", "52 carte (francesi)"],
      ["40", "40 carte (italiane)"],
    ],
    v: "52",
    s: (v) => v.tp == "ca",
  },
  {
    k: "bs",
    l: "Cosa vuoi pescare",
    t: "s",
    o: [
      ["as", "Un asso (4 nel mazzo)"],
      ["pr", "Una carta precisa (es. asso di cuori)"],
      ["se", "Una carta di un seme"],
      ["fi", "Una figura (12 nel mazzo)"],
      ["al", "Altro: scelgo io quante"],
    ],
    v: "as",
    s: (v) => v.tp == "ca",
  },
  {
    k: "Kc",
    l: "Carte «buone» nel mazzo",
    v: 4,
    s: (v) => v.tp == "ca" && v.bs == "al",
  },
  { k: "cn", l: "Carte che peschi n", v: 1, s: (v) => v.tp == "ca" },
  {
    k: "ck",
    l: "Quante «buone» vuoi tra quelle pescate k",
    v: 1,
    s: (v) => v.tp == "ca",
  },
  {
    k: "mo",
    l: "Dopo ogni pescata",
    t: "s",
    o: [
      ["s", "Senza reinserimento (la carta non torna nel mazzo)"],
      ["c", "Con reinserimento (la carta torna nel mazzo)"],
    ],
    v: "s",
    s: (v) => v.tp == "ca",
  },
  /* eventi */
  { k: "pa", l: "P(A) (%)", v: 40, s: (v) => v.tp == "ev" },
  { k: "pb", l: "P(B) (%)", v: 30, s: (v) => v.tp == "ev" },
  {
    k: "rl",
    l: "Rapporto tra A e B",
    t: "s",
    o: [
      ["ind", "Indipendenti"],
      ["inc", "Incompatibili"],
      ["ab", "So P(A∩B)"],
      ["ba", "So P(B|A)"],
    ],
    v: "ind",
    s: (v) => v.tp == "ev",
  },
  {
    k: "pab",
    l: "P(A∩B) (%)",
    v: 15,
    s: (v) => v.tp == "ev" && v.rl == "ab",
  },
  {
    k: "pba",
    l: "P(B|A) (%)",
    v: 50,
    s: (v) => v.tp == "ev" && v.rl == "ba",
  },
  /* Bayes */
  {
    k: "hp",
    l: "Probabilità a priori P(Hᵢ) in % (separate da ;, somma 100)",
    t: "a",
    v: "50; 30; 20",
    s: (v) => v.tp == "ba",
  },
  {
    k: "hl",
    l: "Verosimiglianza P(E|Hᵢ) in % (stesso numero di valori)",
    t: "a",
    v: "1; 3; 5",
    s: (v) => v.tp == "ba",
  },
  /* binomiale */
  { k: "bn", l: "Numero di prove n", v: 10, s: (v) => v.tp == "bi" },
  {
    k: "p",
    l: "Probabilità di successo p (%)",
    v: 50,
    s: (v) => ["bi", "ge"].includes(v.tp),
  },
  { k: "bk", l: "Numero di successi k", v: 6, s: (v) => v.tp == "bi" },
  /* ipergeometrica */
  { k: "hN", l: "Elementi totali N", v: 52, s: (v) => v.tp == "ip" },
  { k: "hK", l: "Elementi «buoni» K", v: 13, s: (v) => v.tp == "ip" },
  {
    k: "hn",
    l: "Estrazioni n (senza reinserimento)",
    v: 5,
    s: (v) => v.tp == "ip",
  },
  { k: "hk", l: "Buoni estratti k", v: 2, s: (v) => v.tp == "ip" },
  /* lotterie */
  { k: "lN", l: "Numeri della ruota N", v: 90, s: (v) => v.tp == "lo" },
  { k: "lm", l: "Numeri estratti", v: 6, s: (v) => v.tp == "lo" },
  { k: "lg", l: "Numeri giocati", v: 6, s: (v) => v.tp == "lo" },
  /* geometrica */
  {
    k: "gk",
    l: "Il primo successo alla prova k",
    v: 3,
    s: (v) => v.tp == "ge",
  },
  /* Poisson */
  { k: "lam", l: "Media λ (eventi attesi)", v: 3, s: (v) => v.tp == "po" },
  { k: "pk", l: "Numero di eventi k", v: 2, s: (v) => v.tp == "po" },
  /* urna */
  {
    k: "un",
    l: "Palline per colore nell’urna (separate da ;)",
    t: "a",
    v: "5; 3; 2",
    s: (v) => v.tp == "ur",
  },
  {
    k: "ue",
    l: "Palline estratte per colore (separate da ;)",
    t: "a",
    v: "2; 1; 1",
    s: (v) => v.tp == "ur",
  },
  /* dadi */
  { k: "dn", l: "Numero di dadi", v: 2, s: (v) => v.tp == "da" },
  { k: "df", l: "Facce di ogni dado", v: 6, s: (v) => v.tp == "da" },
  { k: "ds", l: "Somma che esce", v: 7, s: (v) => v.tp == "da" },
  /* valore atteso */
  {
    k: "xv",
    l: "Valori X (separati da ;)",
    t: "a",
    v: "-100; 0; 100; 300",
    s: (v) => v.tp == "va",
  },
  {
    k: "xp",
    l: "Probabilità in % (stesso numero di valori, somma 100)",
    t: "a",
    v: "20; 30; 35; 15",
    s: (v) => v.tp == "va",
  },
  /* normale */
  { k: "mu", l: "Media μ", v: 0, s: (v) => v.tp == "no" },
  { k: "sg", l: "Deviazione standard σ", v: 1, s: (v) => v.tp == "no" },
  { k: "xa", l: "Valore a", v: -1, s: (v) => v.tp == "no" },
  { k: "xb", l: "Valore b", v: 1, s: (v) => v.tp == "no" },
];
