// Sezione «Probabilità»: tutti i casi (classica, eventi, Bayes, binomiale, ipergeometrica, lotterie,
// geometrica, Poisson, urne con/senza reinserimento, dadi, valore atteso, normale): FM.prb e T.prb
FM.prb = eq(
  `<b>Probabilità classica</b><i>P</i>(<i>A</i>) = ${fr("casi favorevoli", "casi possibili")} , &nbsp;<i>P</i>(<i>Ā</i>) = 1 − <i>P</i>(<i>A</i>) , &nbsp;0 ≤ <i>P</i> ≤ 1`,
  `<b>Unione</b><i>P</i>(<i>A</i>∪<i>B</i>) = <i>P</i>(<i>A</i>) + <i>P</i>(<i>B</i>) − <i>P</i>(<i>A</i>∩<i>B</i>) &nbsp;(incompatibili: <i>P</i>(<i>A</i>∩<i>B</i>) = 0)`,
  `<b>Intersezione</b><i>P</i>(<i>A</i>∩<i>B</i>) = <i>P</i>(<i>A</i>)·<i>P</i>(<i>B</i>|<i>A</i>) &nbsp;(indipendenti: <i>P</i>(<i>A</i>)·<i>P</i>(<i>B</i>))`,
  `<b>Condizionata</b><i>P</i>(<i>A</i>|<i>B</i>) = ${fr("<i>P</i>(<i>A</i>∩<i>B</i>)", "<i>P</i>(<i>B</i>)")}`,
  `<b>Probabilità totali e Bayes</b><i>P</i>(<i>E</i>) = Σ <i>P</i>(<i>H</i><sub>i</sub>)·<i>P</i>(<i>E</i>|<i>H</i><sub>i</sub>) , &nbsp;<i>P</i>(<i>H</i><sub>i</sub>|<i>E</i>) = ${fr("<i>P</i>(<i>H</i><sub>i</sub>)·<i>P</i>(<i>E</i>|<i>H</i><sub>i</sub>)", "<i>P</i>(<i>E</i>)")}`,
  `<b>Binomiale</b>(con reinserimento) <i>P</i>(<i>X</i>=<i>k</i>) = <i>C</i><sub>n,k</sub>·<i>p</i><sup>k</sup>(1−<i>p</i>)<sup>n−k</sup> , &nbsp;<i>E</i> = <i>np</i> , &nbsp;<i>σ</i><sup>2</sup> = <i>np</i>(1−<i>p</i>)`,
  `<b>Ipergeometrica</b>(senza reinserimento) <i>P</i>(<i>X</i>=<i>k</i>) = ${fr("<i>C</i><sub>K,k</sub>·<i>C</i><sub>N−K,n−k</sub>", "<i>C</i><sub>N,n</sub>")} , &nbsp;<i>E</i> = <i>n</i>·${fr("K", "N")}`,
  `<b>Geometrica</b><i>P</i>(<i>X</i>=<i>k</i>) = (1−<i>p</i>)<sup>k−1</sup>·<i>p</i> , &nbsp;<i>E</i> = 1/<i>p</i> &nbsp;(primo successo alla prova <i>k</i>)`,
  `<b>Poisson</b><i>P</i>(<i>X</i>=<i>k</i>) = e<sup>−λ</sup>·${fr("<i>λ</i><sup>k</sup>", "<i>k</i>!")} , &nbsp;<i>E</i> = <i>σ</i><sup>2</sup> = <i>λ</i>`,
  `<b>Urna, composizione data</b>senza reinserimento ${fr("∏ <i>C</i><sub>n<sub>i</sub>,k<sub>i</sub></sub>", "<i>C</i><sub>N,m</sub>")} , &nbsp;con reinserimento ${fr("<i>m</i>!", "∏ <i>k</i><sub>i</sub>!")}·∏ (${fr("<i>n</i><sub>i</sub>", "<i>N</i>")})<sup>k<sub>i</sub></sup>`,
  `<b>Dadi</b>somma di <i>n</i> dadi a <i>f</i> facce: <i>f</i><sup>n</sup> casi possibili, ciascuno con probabilità 1/<i>f</i><sup>n</sup>`,
  `<b>Valore atteso</b><i>E</i>[<i>X</i>] = Σ <i>x</i><sub>i</sub><i>p</i><sub>i</sub> , &nbsp;<i>σ</i><sup>2</sup> = <i>E</i>[<i>X</i><sup>2</sup>] − <i>E</i>[<i>X</i>]<sup>2</sup>`,
  `<b>Normale</b><i>z</i> = ${fr("<i>x</i> − <i>μ</i>", "<i>σ</i>")} , &nbsp;<i>P</i>(<i>X</i> ≤ <i>x</i>) = Φ(<i>z</i>) = ½[1 + erf(<i>z</i>/√2)]`,
);

// Percentuale in ingresso → probabilità 0..1 (controlla l'intervallo)
const prP = (x) => x / 100;
const prOk = (...a) => a.every((x) => isFinite(x) && x >= 0 && x <= 100);
// Probabilità: percentuale leggibile e frazione "1 su N"
const prU = (p) => (p > 0 && p < 1 ? "1 su " + fg(+(1 / p).toPrecision(4)) : p >= 1 ? "certo" : "impossibile");
// Elenco di numeri in percentuale → probabilità
const prList = (s) => nums(s).map((x) => x / 100);

// Grafico a barre di una distribuzione (percentuali)
function prBarre(titolo, xs, ps, nomeX) {
  const lb = xs.map((x) => nomeX + " " + fg(x));
  return plot({
    t: titolo,
    xs,
    bars: [{ n: "Probabilità", c: PAL[0], v: ps.map((p) => p * 100) }],
    yf: (q) => f2(q) + "%",
    lb,
  });
}
// Se la distribuzione ha troppi valori, mostra solo la zona dove la probabilità non è trascurabile
function prFinestra(xs, ps) {
  if (xs.length <= 120) return { xs, ps, tagliato: false };
  const mx = Math.max(...ps);
  let a = ps.findIndex((p) => p > mx * 1e-6),
    b = ps.length - 1 - [...ps].reverse().findIndex((p) => p > mx * 1e-6);
  if (b - a > 400) {
    const m = ps.indexOf(mx);
    a = Math.max(0, m - 200);
    b = Math.min(ps.length - 1, m + 200);
  }
  return { xs: xs.slice(a, b + 1), ps: ps.slice(a, b + 1), tagliato: true };
}
// Tabella di una distribuzione con probabilità puntuale e cumulate
function prTab(nome, xs, ps) {
  let c = 0;
  return TB(
    [nome, "P(X = x)", "P(X ≤ x)", "P(X ≥ x)"],
    xs.map((x, i) => {
      c += ps[i];
      const sup = Math.max(0, 1 - c + ps[i]);
      return [fg(x), fpct(ps[i]), fpct(Math.min(1, c)), fpct(sup)];
    }),
  );
}

T.prb = {
  n: "Probabilità",
  s: "P",
  fm: FM.prb,
  f: [
    {
      k: "tp",
      l: "Caso di probabilità",
      t: "s",
      o: [
        ["cl", "Classica (favorevoli / possibili)"],
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
    { k: "pos", l: "Casi possibili (tutti equiprobabili)", v: 52, s: (v) => v.tp == "cl" },
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
    { k: "pab", l: "P(A∩B) (%)", v: 15, s: (v) => v.tp == "ev" && v.rl == "ab" },
    { k: "pba", l: "P(B|A) (%)", v: 50, s: (v) => v.tp == "ev" && v.rl == "ba" },
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
    { k: "p", l: "Probabilità di successo p (%)", v: 50, s: (v) => ["bi", "ge"].includes(v.tp) },
    { k: "bk", l: "Numero di successi k", v: 6, s: (v) => v.tp == "bi" },
    /* ipergeometrica */
    { k: "hN", l: "Elementi totali N", v: 52, s: (v) => v.tp == "ip" },
    { k: "hK", l: "Elementi «buoni» K", v: 13, s: (v) => v.tp == "ip" },
    { k: "hn", l: "Estrazioni n (senza reinserimento)", v: 5, s: (v) => v.tp == "ip" },
    { k: "hk", l: "Buoni estratti k", v: 2, s: (v) => v.tp == "ip" },
    /* lotterie */
    { k: "lN", l: "Numeri della ruota N", v: 90, s: (v) => v.tp == "lo" },
    { k: "lm", l: "Numeri estratti", v: 6, s: (v) => v.tp == "lo" },
    { k: "lg", l: "Numeri giocati", v: 6, s: (v) => v.tp == "lo" },
    /* geometrica */
    { k: "gk", l: "Il primo successo alla prova k", v: 3, s: (v) => v.tp == "ge" },
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
  ],
  c(v) {
    const tp = v.tp;

    /* ---------- Classica ---------- */
    if (tp == "cl") {
      const fa = Math.round(v.fa),
        pos = Math.round(v.pos);
      if (!(pos >= 1) || !(fa >= 0) || fa > pos)
        return ER("Servono 0 ≤ favorevoli ≤ possibili e almeno un caso possibile.");
      const p = fa / pos;
      return (
        ks([
          K("Probabilità P(A)", fpct(p), 1),
          K("Come frazione", `${fg(fa)} / ${fg(pos)}`),
          K("Come numero", f4(p)),
          K("In altre parole", prU(p)),
          K("Probabilità del contrario", fpct(1 - p)),
          K("Quote (favorevoli : sfavorevoli)", `${fg(fa)} : ${fg(pos - fa)}`),
        ]) +
        `<p class="note">Esempio: 4 assi in un mazzo di 52 carte → P(asso) = 4/52 = 1/13.</p>`
      );
    }

    /* ---------- Eventi A e B ---------- */
    if (tp == "ev") {
      if (!prOk(v.pa, v.pb)) return ER("P(A) e P(B) devono essere tra 0% e 100%.");
      const a = prP(v.pa),
        b = prP(v.pb);
      let ab, nota;
      if (v.rl == "ind") ab = a * b;
      else if (v.rl == "inc") ab = 0;
      else if (v.rl == "ab") ab = prP(v.pab);
      else {
        if (!prOk(v.pba)) return ER("P(B|A) deve essere tra 0% e 100%.");
        ab = a * prP(v.pba);
      }
      if (ab > Math.min(a, b) + 1e-12 || ab < Math.max(0, a + b - 1) - 1e-12)
        return ER(
          `P(A∩B) deve stare tra ${fpct(Math.max(0, a + b - 1))} e ${fpct(Math.min(a, b))}: i dati inseriti non sono coerenti.`,
        );
      if (v.rl == "inc" && a + b > 1 + 1e-12)
        return ER("Due eventi incompatibili non possono avere P(A) + P(B) > 100%.");
      const un = a + b - ab,
        ind = Math.abs(ab - a * b) < 1e-9;
      nota = v.rl == "inc" ? "incompatibili (non possono accadere insieme)" : ind ? "indipendenti" : "dipendenti";
      return (
        ks([
          K("P(A∩B) — entrambi", fpct(ab), 1),
          K("P(A∪B) — almeno uno", fpct(un), 1),
          K("P(A|B)", b > 0 ? fpct(ab / b) : "—"),
          K("P(B|A)", a > 0 ? fpct(ab / a) : "—"),
          K("Solo A (non B)", fpct(a - ab)),
          K("Solo B (non A)", fpct(b - ab)),
          K("Esattamente uno dei due", fpct(a + b - 2 * ab)),
          K("Nessuno dei due", fpct(1 - un)),
          K("P(Ā)", fpct(1 - a)),
          K("P(B̄)", fpct(1 - b)),
        ]) +
        `<p class="note">Gli eventi A e B sono <b>${nota}</b>. Per essere indipendenti deve valere P(A∩B) = P(A)·P(B) = ${fpct(a * b)}.</p>` +
        TB(
          ["", "B", "non B", "Totale"],
          [
            ["A", fpct(ab), fpct(a - ab), fpct(a)],
            ["non A", fpct(b - ab), fpct(1 - un), fpct(1 - a)],
            ["Totale", fpct(b), fpct(1 - b), "100%"],
          ],
        )
      );
    }

    /* ---------- Bayes ---------- */
    if (tp == "ba") {
      const pri = prList(v.hp),
        ver = prList(v.hl),
        m = pri.length;
      if (m < 2 || ver.length != m)
        return ER("Inserisci almeno due ipotesi e lo stesso numero di verosimiglianze.");
      if (pri.some((x) => x < 0 || x > 1) || ver.some((x) => x < 0 || x > 1))
        return ER("Le probabilità devono essere tra 0% e 100%.");
      const sm = pri.reduce((s, x) => s + x, 0);
      if (Math.abs(sm - 1) > 1e-6)
        return ER(`Le probabilità a priori devono sommare 100% (ora ${f2(sm * 100)}%).`);
      const r = bayes(pri, ver);
      if (!(r.pe > 0)) return ER("P(E) è zero: l’evidenza non può verificarsi.");
      return (
        ks([
          K("P(E) — probabilità totale", fpct(r.pe), 1),
          ...r.post.map((q, i) => K(`P(H${i + 1}|E) a posteriori`, fpct(q), q == Math.max(...r.post))),
        ]) +
        TB(
          ["Ipotesi", "P(Hᵢ) a priori", "P(E|Hᵢ)", "P(Hᵢ)·P(E|Hᵢ)", "P(Hᵢ|E) a posteriori"],
          pri.map((p, i) => ["H" + (i + 1), fpct(p), fpct(ver[i]), fpct(p * ver[i]), fpct(r.post[i])]),
        ) +
        plot({
          t: "Probabilità a priori e a posteriori (%)",
          xs: pri.map((_, i) => i + 1),
          bars: [
            { n: "A priori", c: PAL[1], v: pri.map((x) => x * 100) },
            { n: "A posteriori", c: PAL[0], v: r.post.map((x) => x * 100) },
          ],
          yf: (q) => f2(q) + "%",
          lb: pri.map((_, i) => "Ipotesi H" + (i + 1)),
        })
      );
    }

    /* ---------- Binomiale ---------- */
    if (tp == "bi") {
      const n = Math.round(v.bn),
        k = Math.round(v.bk);
      if (!(n >= 1 && n <= 5000)) return ER("Il numero di prove n deve essere tra 1 e 5.000.");
      if (!prOk(v.p)) return ER("p deve essere tra 0% e 100%.");
      if (!(k >= 0 && k <= n)) return ER("Il numero di successi k deve essere tra 0 e n.");
      const p = prP(v.p),
        f = (j) => binPmf(n, j, p),
        eq_ = f(k),
        le = sumPmf(f, 0, k),
        ge = sumPmf(f, k, n),
        mu = n * p,
        sd = Math.sqrt(n * p * (1 - p)),
        all = Array.from({ length: n + 1 }, (_, i) => i),
        W = prFinestra(all, all.map(f));
      return (
        ks([
          K(`P(X = ${k})`, fpct(eq_), 1),
          K(`P(X ≤ ${k})`, fpct(le)),
          K(`P(X &lt; ${k})`, fpct(Math.max(0, le - eq_))),
          K(`P(X ≥ ${k})`, fpct(ge)),
          K(`P(X &gt; ${k})`, fpct(Math.max(0, ge - eq_))),
          K("Media np", f2(mu)),
          K("Varianza np(1−p)", f4(sd * sd)),
          K("Deviazione standard", f4(sd)),
        ]) +
        `<p class="note">In ${fg(n)} prove ci sono 2<sup>n</sup> = ${bFmt(bDispRip(2, n))} sequenze di successo/insuccesso (se p = 50%, tutte equiprobabili). Quelle con esattamente ${fg(k)} successi sono C(${fg(n)},${fg(k)}) = ${bFmt(bComb(n, k))}, ciascuna con probabilità p<sup>${fg(k)}</sup>·(1−p)<sup>${fg(n - k)}</sup>.</p>` +
        prBarre("Distribuzione binomiale", W.xs, W.ps, "k =") +
        (W.tagliato ? `<p class="note">Il grafico mostra solo i valori con probabilità non trascurabile.</p>` : prTab("k", W.xs, W.ps))
      );
    }

    /* ---------- Ipergeometrica ---------- */
    if (tp == "ip") {
      const N = Math.round(v.hN),
        K_ = Math.round(v.hK),
        n = Math.round(v.hn),
        k = Math.round(v.hk);
      if (!(N >= 1 && N <= 5000) || !(K_ >= 0 && K_ <= N) || !(n >= 0 && n <= N))
        return ER("Servono N tra 1 e 5.000, 0 ≤ K ≤ N e 0 ≤ n ≤ N.");
      if (!(k >= 0 && k <= Math.min(n, K_)))
        return ER("Il numero di buoni estratti k deve essere tra 0 e il minimo di n e K.");
      const lo = Math.max(0, n - (N - K_)),
        hi = Math.min(n, K_),
        xs = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
        ps = xs.map((j) => hypP(N, K_, n, j)),
        W = prFinestra(xs, ps),
        fav = hypNum(N, K_, n, k),
        tot = bComb(N, n),
        p = K_ / N,
        eqk = hypPmf(N, K_, n, k),
        le = sumPmf((j) => hypP(N, K_, n, j), lo, k),
        ge = sumPmf((j) => hypP(N, K_, n, j), k, hi);
      return (
        ks([
          K(`P(X = ${k})`, fpct(eqk), 1),
          K(`P(X ≤ ${k})`, fpct(le)),
          K(`P(X ≥ ${k})`, fpct(ge)),
          K("Casi favorevoli", bFmt(fav)),
          K("Casi possibili C(N,n)", bFmt(tot)),
          K("Media n·K/N", f4(n * p)),
          K("Se fosse con reinserimento (binomiale)", fpct(binPmf(n, k, p))),
        ]) +
        prBarre("Distribuzione ipergeometrica", W.xs, W.ps, "k =") +
        (W.tagliato ? "" : prTab("k", W.xs, W.ps))
      );
    }

    /* ---------- Lotterie ---------- */
    if (tp == "lo") {
      const N = Math.round(v.lN),
        m = Math.round(v.lm),
        g = Math.round(v.lg);
      if (!(N >= 1 && N <= 200) || !(m >= 1 && m <= N) || !(g >= 1 && g <= N))
        return ER("Servono N tra 1 e 200, e numeri estratti e giocati tra 1 e N.");
      const tot = bComb(N, m),
        lo = Math.max(0, g - (N - m)),
        hi = Math.min(g, m),
        xs = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
        ws = xs.map((j) => bComb(m, j) * bComb(N - m, g - j)),
        ps = ws.map((w) => bRatio(w, tot));
      return (
        ks([
          K("Combinazioni possibili C(N,estratti)", bFmt(tot), 1),
          K(`Indovinare tutti i ${fg(hi)} possibili`, fpct(ps[ps.length - 1])),
          K("In altre parole", bUnoSu(ws[ws.length - 1], tot)),
          K("Numeri indovinati in media", f4((g * m) / N)),
        ]) +
        TB(
          ["Indovinati", "Combinazioni favorevoli", "Probabilità", "1 su …"],
          xs.map((j, i) => [fg(j), bFmt(ws[i]), fpct(ps[i]), bUnoSu(ws[i], tot)]),
        ) +
        prBarre("Quanti numeri si indovinano", xs, ps, "Indovinati =") +
        `<p class="note">Con 90 numeri e 6 estratti, 6 giocati: 1 su ${bFmt(bComb(90, 6))} (SuperEnalotto, 6 punti).</p>`
      );
    }

    /* ---------- Geometrica ---------- */
    if (tp == "ge") {
      const k = Math.round(v.gk);
      if (!prOk(v.p) || !(prP(v.p) > 0)) return ER("p deve essere maggiore di 0% e al massimo 100%.");
      if (!(k >= 1 && k <= 100000)) return ER("La prova k deve essere un intero da 1 a 100.000.");
      const p = prP(v.p),
        cdf = 1 - (1 - p) ** k,
        mx = Math.min(60, Math.max(10, Math.ceil(3 / p))),
        xs = Array.from({ length: mx }, (_, i) => i + 1);
      return (
        ks([
          K(`P(primo successo alla prova ${k})`, fpct(geoPmf(p, k)), 1),
          K(`P(successo entro ${k} prove)`, fpct(cdf)),
          K(`P(nessun successo in ${k} prove)`, fpct(1 - cdf)),
          K("Prove attese 1/p", f2(1 / p)),
          K("Varianza (1−p)/p²", f2((1 - p) / (p * p))),
        ]) + prBarre("Distribuzione geometrica", xs, xs.map((x) => geoPmf(p, x)), "Prova")
      );
    }

    /* ---------- Poisson ---------- */
    if (tp == "po") {
      const l = v.lam,
        k = Math.round(v.pk);
      if (!(l >= 0 && l <= 5000)) return ER("λ deve essere tra 0 e 5.000.");
      if (!(k >= 0 && k <= 100000)) return ER("k deve essere un intero tra 0 e 100.000.");
      const f = (j) => poiPmf(l, j),
        eq_ = f(k),
        le = sumPmf(f, 0, k),
        sd = Math.sqrt(l),
        lo = Math.max(0, Math.floor(l - 5 * sd - 2)),
        hi = Math.ceil(l + 5 * sd + 4),
        xs = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
        W = prFinestra(xs, xs.map(f));
      return (
        ks([
          K(`P(X = ${k})`, fpct(eq_), 1),
          K(`P(X ≤ ${k})`, fpct(le)),
          K(`P(X ≥ ${k})`, fpct(Math.max(0, 1 - le + eq_))),
          K("P(nessun evento) = e^(−λ)", fpct(Math.exp(-l))),
          K("Media = varianza = λ", f4(l)),
        ]) + prBarre("Distribuzione di Poisson", W.xs, W.ps, "k =")
      );
    }

    /* ---------- Urna a più colori ---------- */
    if (tp == "ur") {
      const U = nums(v.un).map(Math.round),
        E = nums(v.ue).map(Math.round),
        c = U.length;
      if (c < 2 || E.length != c) return ER("Inserisci almeno due colori e lo stesso numero di estratte.");
      if (U.some((x) => x < 0) || E.some((x) => x < 0)) return ER("Servono numeri non negativi.");
      const N = U.reduce((a, b) => a + b, 0),
        m = E.reduce((a, b) => a + b, 0);
      if (N < 1 || N > 5000) return ER("Le palline totali devono essere tra 1 e 5.000.");
      if (m < 1 || m > N) return ER("Le palline estratte devono essere almeno 1 e al massimo quante sono nell’urna.");
      const ok = E.every((e, i) => e <= U[i]),
        senza = ok ? U.reduce((r, u, i) => r * bComb(u, E[i]), 1n) : 0n,
        tot = bComb(N, m),
        // con reinserimento: sequenze ordinate favorevoli = m!/∏k! · ∏ n_i^k_i ; totali N^m
        conFav = bMulti(E) * U.reduce((r, u, i) => r * BigInt(u) ** BigInt(E[i]), 1n),
        conTot = bDispRip(N, m);
      return (
        ks([
          K("Senza reinserimento", fpct(bRatio(senza, tot)), 1),
          K("Con reinserimento", fpct(bRatio(conFav, conTot)), 1),
          K("Casi favorevoli (senza)", bFmt(senza)),
          K("Casi possibili C(N,m)", bFmt(tot)),
          K("Sequenze favorevoli (con)", bFmt(conFav)),
          K("Sequenze possibili N^m", bFmt(conTot)),
        ]) +
        TB(
          ["Colore", "Nell’urna", "Estratte", "Modi di sceglierle C(nᵢ,kᵢ)", "P(colore) a ogni estrazione"],
          U.map((u, i) => [i + 1, fg(u), fg(E[i]), bFmt(bComb(u, E[i])), fpct(u / N)]),
        ) +
        `<p class="note">Totale ${fg(N)} palline, ne estrai ${fg(m)}. <b>Senza reinserimento</b> ogni pallina estratta non rientra; <b>con reinserimento</b> si rimette nell’urna e il colore si può ripetere.${ok ? "" : " Hai chiesto più palline di un colore di quelle presenti: senza reinserimento è impossibile."}</p>`
      );
    }

    /* ---------- Dadi ---------- */
    if (tp == "da") {
      const nd = Math.round(v.dn),
        fc = Math.round(v.df),
        s = Math.round(v.ds);
      if (!(nd >= 1 && nd <= 30) || !(fc >= 2 && fc <= 100) || nd * fc > 1500)
        return ER("Usa da 1 a 30 dadi con 2–100 facce (dadi × facce al massimo 1.500).");
      const w = dadiWays(nd, fc),
        tot = bDispRip(fc, nd),
        xs0 = Array.from({ length: nd * fc - nd + 1 }, (_, i) => nd + i),
        ps0 = xs0.map((x) => bRatio(w[x], tot)),
        W = prFinestra(xs0, ps0),
        xs = W.xs,
        ps = W.ps,
        at = (x) => (x >= 0 && x < w.length ? w[x] : 0n);
      let le = 0n,
        ge = 0n;
      for (let x = nd; x <= Math.min(s, nd * fc); x++) le += at(x);
      for (let x = Math.max(s, nd); x <= nd * fc; x++) ge += at(x);
      const mean = (nd * (fc + 1)) / 2,
        vr = (nd * (fc * fc - 1)) / 12;
      return (
        ks([
          K(`P(somma = ${s})`, fpct(bRatio(at(s), tot)), 1),
          K(`Modi per fare ${s}`, bFmt(at(s))),
          K("Casi possibili f^n", bFmt(tot)),
          K(`P(somma ≤ ${s})`, fpct(bRatio(le, tot))),
          K(`P(somma ≥ ${s})`, fpct(bRatio(ge, tot))),
          K("Somma media n(f+1)/2", f2(mean)),
          K("Deviazione standard", f4(Math.sqrt(vr))),
        ]) +
        prBarre(`Somma di ${nd} dadi a ${fc} facce`, xs, ps, "Somma") +
        (!W.tagliato && xs.length <= 60
          ? TB(
              ["Somma", "Modi", "Probabilità", "1 su …"],
              xs.map((x, i) => [fg(x), bFmt(w[x]), fpct(ps[i]), bUnoSu(w[x], tot)]),
            )
          : "")
      );
    }

    /* ---------- Valore atteso ---------- */
    if (tp == "va") {
      const X = nums(v.xv),
        Pp = prList(v.xp);
      if (X.length < 2 || X.length != Pp.length)
        return ER("Inserisci almeno due valori e lo stesso numero di probabilità.");
      if (Pp.some((x) => x < 0 || x > 1)) return ER("Le probabilità devono essere tra 0% e 100%.");
      const sm = Pp.reduce((a, b) => a + b, 0);
      if (Math.abs(sm - 1) > 1e-6) return ER(`Le probabilità devono sommare 100% (ora ${f2(sm * 100)}%).`);
      const E = X.reduce((s, x, i) => s + x * Pp[i], 0),
        E2 = X.reduce((s, x, i) => s + x * x * Pp[i], 0),
        vr = Math.max(0, E2 - E * E),
        ord = X.map((x, i) => [x, Pp[i]]).sort((a, b) => a[0] - b[0]);
      return (
        ks([
          K("Valore atteso E[X]", f4(E), 1),
          K("E[X²]", f4(E2)),
          K("Varianza", f4(vr)),
          K("Deviazione standard", f4(Math.sqrt(vr))),
          K("Probabilità di perdita P(X &lt; 0)", fpct(X.reduce((s, x, i) => s + (x < 0 ? Pp[i] : 0), 0))),
        ]) +
        prBarre("Distribuzione di X", ord.map((o) => o[0]), ord.map((o) => o[1]), "X =") +
        prTab("x", ord.map((o) => o[0]), ord.map((o) => o[1]))
      );
    }

    /* ---------- Normale ---------- */
    if (tp == "no") {
      const mu = v.mu,
        sg = v.sg,
        a = Math.min(v.xa, v.xb),
        b = Math.max(v.xa, v.xb);
      if (!(sg > 0)) return ER("La deviazione standard σ deve essere maggiore di 0.");
      const za = (a - mu) / sg,
        zb = (b - mu) / sg,
        Fa = normCdf(za),
        Fb = normCdf(zb),
        xs = Array.from({ length: 81 }, (_, i) => mu + (-4 + i * 0.1) * sg);
      return (
        ks([
          K(`P(a ≤ X ≤ b)`, fpct(Fb - Fa), 1),
          K(`P(X ≤ ${fg(a)})`, fpct(Fa)),
          K(`P(X ≥ ${fg(b)})`, fpct(1 - Fb)),
          K("z di a", f4(za)),
          K("z di b", f4(zb)),
          K("Entro ±1σ / ±2σ / ±3σ", "68,27% / 95,45% / 99,73%"),
        ]) +
        plot({
          t: "Densità della normale N(μ, σ²)",
          xs,
          lines: [{ n: "Densità", c: PAL[0], a: 1, v: xs.map((x) => normPdf((x - mu) / sg) / sg) }],
          yf: (q) => f4(q),
          lb: xs.map((x) => "x = " + f2(x)),
        })
      );
    }
    return ER("Controlla i dati inseriti.");
  },
};
