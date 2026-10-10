// Sezione «Dashboard titoli»: andamento storico, media mobile, volatilità e volumi
FM.dt = eq(
  `<b>Rendimento</b><i>r</i><sub>t</sub> = ln ${fr("<i>P</i><sub>t</sub>", "<i>P</i><sub>t−1</sub>")} , &nbsp;<i>σ</i><sub>ann</sub> = <i>σ</i><sub>giorn</sub>·√252`,
  `<b>Media mobile</b>SMA<sub>20</sub> = ${fr("Σ <i>P</i><sub>t−k</sub>", "20")}`,
);
T.dt = {
  n: "Dashboard titoli",
  s: "D",
  fm: FM.dt,
  f: [
    { k: "s", l: "Simbolo del titolo (es. AAPL, MSFT)", t: "t", v: "AAPL" },
    { k: "k", l: "Chiave Alpha Vantage", t: "t", v: AV_KEY },
    {
      k: "g", l: "Periodo", t: "s", v: 21,
      o: [[5, "Settimana"], [21, "Mese"], [63, "3 mesi"], [252, "Anno"]],
    },
  ],
  c(v) {
    if (!v.s.trim()) return ER("Inserisci un simbolo.");
    const R = remote(avUrl("TIME_SERIES_DAILY", v.s, v.k, "&outputsize=full"), 700);
    if (R.st == "load") return `<p class="note">Caricamento dello storico…</p>`;
    if (R.st == "err") return ER("Errore di rete: riprova.");
    const ts = R.d["Time Series (Daily)"];
    if (!ts) return ER(avErr(R.d) || "Titolo non trovato.");
    const S = avSeries(ts).slice(-(+v.g + 1)),
      P = S.map((r) => r[4]),
      rt = P.slice(1).map((p, i) => Math.log(p / P[i])),
      mu = rt.reduce((a, b) => a + b, 0) / (rt.length || 1),
      sd = Math.sqrt(rt.reduce((a, b) => a + (b - mu) ** 2, 0) / Math.max(1, rt.length - 1)),
      ch = (P[P.length - 1] / P[0] - 1) * 100,
      sma = P.map((_, i) => {
        const w = P.slice(Math.max(0, i - 19), i + 1);
        return w.reduce((a, b) => a + b, 0) / w.length;
      }),
      xs = S.map((_, i) => i),
      lab = (i) => (S[Math.round(i)] || [""])[0].slice(5);
    return (
      ks([
        K(v.s.toUpperCase() + " ultima chiusura", f2(P[P.length - 1]), 1),
        K("Variazione nel periodo", (ch > 0 ? "+" : "") + f2(ch) + "%"),
        K("Massimo", f2(Math.max(...S.map((r) => r[2])))),
        K("Minimo", f2(Math.min(...S.map((r) => r[3])))),
        K("Volatilità annua", f2(sd * Math.sqrt(252) * 100) + "%"),
        K("Volume medio", sh(S.reduce((a, r) => a + r[5], 0) / S.length)),
      ]) +
      plot({
        t: "Andamento storico e media mobile",
        xs,
        lines: [
          { n: "Chiusura", c: PAL[0], a: 1, v: P },
          { n: "Media mobile 20", c: PAL[1], d: "5 4", v: sma },
        ],
        xf: lab,
        lb: S.map((r) => r[0] + " · " + f2(r[4])),
      }) +
      plot({
        t: "Volumi scambiati",
        xs,
        bars: [{ n: "Volume", c: PAL[2], v: S.map((r) => r[5]) }],
        yf: sh,
        xf: lab,
        lb: S.map((r) => r[0]),
      })
    );
  },
};
