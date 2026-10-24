// Caricamento dei dati: tutti i valori "fissi" stanno in /json (divisi per cartella) (non più nel codice).
// DATA_READY si risolve quando i JSON sono pronti; js/core/avvio/boot.js avvia l'app solo dopo.
// I nomi globali (CTY, GR, TH, HD, OPT, BL_TITOLI, ...) restano quelli di prima: il resto del codice non cambia.
const DATA_DIR = "json/";
const DATA_FILES = {
  config: "config/config.json",
  robot: "borsa/robot.json",
  titoli: "borsa/titoli.json",
  strategie: "borsa/strategie.json",
  nazioni: "geografia/nazioni.json",
  gruppi: "home/gruppi.json",
  schede: "home/schede.json",
  ricerca: "ricerca/opzioni.json",
  bandiere: "icone/bandiere.json",
  icone: "icone/form.json",
};

let CFG, ROBOT, BL_TITOLI, BL_STRATEGIE, CTY, GR, TH, HD, OPT, FLG, ICO;

const DATA_READY = Promise.all(
  Object.entries(DATA_FILES).map(([k, f]) =>
    fetch(DATA_DIR + f).then((r) => {
      if (!r.ok) throw new Error(f + " (" + r.status + ")");
      return r.json().then((j) => [k, j]);
    }),
  ),
).then((a) => {
  const d = Object.fromEntries(a);
  CFG = d.config;
  ROBOT = d.robot;
  BL_TITOLI = d.titoli;
  BL_STRATEGIE = d.strategie;
  FLG = d.bandiere;
  ICO = d.icone;
  // [iso, nome, valuta]
  CTY = d.nazioni.map((c) => [c.iso, c.nome, c.valuta]);
  GR = d.gruppi.map((g) => ({
    n: g.nome,
    i: g.icona,
    c: g.colore,
    t: g.schede,
  }));
  // TH[scheda] = [icona, colore, descrizione]
  TH = Object.fromEntries(
    Object.entries(d.schede.schede).map(([k, s]) => [
      k,
      [s.icona, s.colore, s.descrizione],
    ]),
  );
  HD = {
    e: d.schede.home.simbolo,
    t: d.schede.home.titolo,
    d: d.schede.home.descrizione,
  };
  // OPT = [scheda, titolo, descrizione, valori, campo]
  OPT = d.ricerca.map((o) => {
    const a = [o.scheda, o.titolo, o.descrizione];
    if ("valori" in o || "campo" in o) a.push(o.valori || {});
    if (o.campo) a.push(o.campo);
    return a;
  });
  return d;
});
