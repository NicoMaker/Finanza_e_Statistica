// Sezione «Valore titoli»: quotazione intraday (5 minuti) di un titolo mondiale
FM.vt = eq(`<b>Variazione</b>Δ% = ${fr("<i>P</i><sub>ultimo</sub> − <i>P</i><sub>apertura</sub>", "<i>P</i><sub>apertura</sub>")}·100`);
T.vt = {
  n: "Valore titoli",
  s: "$",
  fm: FM.vt,
  f: [
    { k: "s", l: "Simbolo del titolo (es. AAPL, MSFT)", t: "t", v: "AAPL" },
    { k: "k", l: "Chiave Alpha Vantage", t: "t", v: AV_KEY },
  ],
  c(v) {
    if (!v.s.trim()) return ER("Inserisci un simbolo.");
    const R = remote(avUrl("TIME_SERIES_INTRADAY", v.s, v.k, "&interval=5min"), 700);
    if (R.st == "load") return `<p class="note">Caricamento della quotazione…</p>`;
    if (R.st == "err") return ER("Errore di rete: riprova.");
    const ts = R.d["Time Series (5min)"];
    if (!ts) return ER(avErr(R.d) || "Titolo non trovato.");
    const all = avSeries(ts),
      day = all[all.length - 1][0].slice(0, 10),
      S = all.filter((r) => r[0].startsWith(day)),
      last = S[S.length - 1][4],
      op = S[0][1],
      hi = Math.max(...S.map((r) => r[2])),
      lo = Math.min(...S.map((r) => r[3])),
      vol = S.reduce((a, r) => a + r[5], 0),
      ch = ((last - op) / op) * 100;
    return (
      ks([
        K(v.s.toUpperCase() + " ultimo prezzo", f2(last), 1),
        K("Variazione giornaliera", (ch > 0 ? "+" : "") + f2(ch) + "%"),
        K("Apertura", f2(op)),
        K("Massimo", f2(hi)),
        K("Minimo", f2(lo)),
        K("Volume", sh(vol)),
      ]) +
      `<p class="note">Giorno ${day}, ultimo aggiornamento ${S[S.length - 1][0].slice(11, 16)}. Dati Alpha Vantage (piano gratuito: poche richieste al minuto).</p>` +
      plot({
        t: "Prezzo intraday",
        xs: S.map((_, i) => i),
        lines: [{ n: "Chiusura 5 min", c: ch >= 0 ? PAL[2] : PAL[3], a: 1, v: S.map((r) => r[4]) }],
        xf: (i) => (S[Math.round(i)] || [""])[0].slice(11, 16),
        lb: S.map((r) => r[0].slice(11, 16) + " · " + f2(r[4])),
      })
    );
  },
};
