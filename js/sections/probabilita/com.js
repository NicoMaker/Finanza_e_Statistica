// Sezione «Calcolo combinatorio»: numero totale di casi possibili (tutti i tipi, con e senza ripetizione)
// e elenco di tutti i casi: formule (FM.com) e calcolatore (T.com)
const COM_LIM = 3000; // massimo di casi elencati per un solo tipo
const COM_LIM_ALL = 300; // massimo di casi per tipo nel riepilogo

FM.com = eq(
  `<b>Principio moltiplicativo</b><i>N</i> = <i>n</i><sub>1</sub>·<i>n</i><sub>2</sub>·…·<i>n</i><sub>m</sub> &nbsp;(una scelta per ogni passo)`,
  `<b>Disposizioni semplici</b><i>D</i><sub>n,k</sub> = ${fr("<i>n</i>!", "(<i>n</i>−<i>k</i>)!")} &nbsp;(l’ordine conta, niente ripetizioni, <i>k</i> ≤ <i>n</i>)`,
  `<b>Disposizioni con ripetizione</b><i>D′</i><sub>n,k</sub> = <i>n</i><sup><i>k</i></sup> &nbsp;(l’ordine conta, gli elementi si possono ripetere)`,
  `<b>Permutazioni semplici</b><i>P</i><sub>n</sub> = <i>n</i>! &nbsp;(tutti gli elementi, ordine che conta: <i>D</i><sub>n,n</sub>)`,
  `<b>Permutazioni con ripetizione</b><i>P</i><sub>n</sub><sup>(n<sub>1</sub>,…,n<sub>r</sub>)</sup> = ${fr("<i>n</i>!", "<i>n</i><sub>1</sub>!·<i>n</i><sub>2</sub>!·…·<i>n</i><sub>r</sub>!")} &nbsp;(anagrammi: elementi uguali ripetuti)`,
  `<b>Combinazioni semplici</b><i>C</i><sub>n,k</sub> = ${fr("<i>n</i>!", "<i>k</i>!·(<i>n</i>−<i>k</i>)!")} = ${fr("<i>D</i><sub>n,k</sub>", "<i>k</i>!")} &nbsp;(l’ordine non conta, niente ripetizioni)`,
  `<b>Combinazioni con ripetizione</b><i>C′</i><sub>n,k</sub> = <i>C</i><sub>n+k−1,k</sub> = ${fr("(<i>n</i>+<i>k</i>−1)!", "<i>k</i>!·(<i>n</i>−1)!")} &nbsp;(l’ordine non conta, gli elementi si possono ripetere)`,
  `<b>Permutazioni circolari</b>(<i>n</i>−1)! &nbsp;(giro di tavolo) , &nbsp;<b>Collane</b>(<i>n</i>−1)!/2 &nbsp;(si possono anche rovesciare)`,
  `<b>Sconvolgimenti</b>!<i>n</i> = <i>n</i>!·Σ<sub>i=0..n</sub> ${fr("(−1)<sup>i</sup>", "<i>i</i>!")} &nbsp;(nessun elemento al suo posto)`,
  `<b>Partizioni</b><i>S</i>(<i>n</i>,<i>k</i>) = <i>k</i>·<i>S</i>(<i>n</i>−1,<i>k</i>) + <i>S</i>(<i>n</i>−1,<i>k</i>−1) , &nbsp;<i>B</i><sub>n</sub> = Σ<sub>k</sub> <i>S</i>(<i>n</i>,<i>k</i>) , &nbsp;suriezioni = <i>k</i>!·<i>S</i>(<i>n</i>,<i>k</i>)`,
  `<b>Probabilità</b><i>P</i> = ${fr("casi favorevoli", "casi possibili")} &nbsp;(casi equiprobabili: ogni caso ha probabilità 1/<i>N</i>)`,
);

// Espressione «n · (n−1) · … » con i primi e l'ultimo termine
const comProd = (da, q) => {
  if (q <= 0) return "1";
  const t = Array.from({ length: q }, (_, i) => da - i);
  return q <= 6
    ? t.join(" · ")
    : t.slice(0, 3).join(" · ") + " · … · " + t[q - 1];
};
const comI = (s) => `<i>${s}</i>`;

// Descrizione di un tipo di raggruppamento per i dati P (n, k, parola, scelte, etichette)
function comDesc(id, P) {
  const d = comDesc0(id, P);
  if (d)
    d.len =
      { ds: P.k, dr: P.k, cs: P.k, cr: P.k, pm: (P.sz || []).length }[id] ??
      (id == "pr" ? P.w.cnt.reduce((a, b) => a + b, 0) : P.n);
  return d;
}
function comDesc0(id, P) {
  const { n, k, L, w, sz } = P,
    sep = P.sep,
    ord = (c) => c.map((i) => L[i]).join(sep),
    ins = (c) => "{" + c.map((i) => L[i]).join(", ") + "}";
  switch (id) {
    case "ds":
      return {
        nome: "Disposizioni semplici",
        o: "sì",
        r: "no",
        fml: `${comI("D")}<sub>n,k</sub> = ${fr("n!", "(n−k)!")}`,
        val: bDisp(n, k),
        passo:
          k > n
            ? `k = ${k} è maggiore di n = ${n}: senza ripetizioni non si possono scegliere ${k} elementi su ${n}.`
            : `D(${n},${k}) = ${n}! / (${n}−${k})! = ${comProd(n, k)}`,
        en: (l) => enumDisp(n, k, l),
        fm: ord,
      };
    case "dr":
      return {
        nome: "Disposizioni con ripetizione",
        o: "sì",
        r: "sì",
        fml: `${comI("D′")}<sub>n,k</sub> = ${comI("n")}<sup>${comI("k")}</sup>`,
        val: bDispRip(n, k),
        passo: `D′(${n},${k}) = ${n}<sup>${k}</sup> = ${k ? Array(Math.min(k, 6)).fill(n).join(" · ") + (k > 6 ? " · …" : "") : "1"}`,
        en: (l) => enumDispRip(n, k, l),
        fm: ord,
      };
    case "ps":
      return {
        nome: "Permutazioni semplici",
        o: "sì",
        r: "no",
        fml: `${comI("P")}<sub>n</sub> = ${comI("n")}!`,
        val: bFact(n),
        passo: `P(${n}) = ${n}! = ${comProd(n, n)}`,
        en: (l) => enumPerm(n, l),
        fm: ord,
      };
    case "pr": {
      if (!w) return null;
      const m = w.cnt.reduce((a, b) => a + b, 0);
      return {
        nome: "Permutazioni con ripetizione (anagrammi)",
        o: "sì",
        r: "elementi uguali",
        fml: `${fr("n!", "n<sub>1</sub>!·…·n<sub>r</sub>!")}`,
        val: bMulti(w.cnt),
        passo: `${m}! / (${w.cnt.map((c) => c + "!").join(" · ")}) &nbsp;con &nbsp;${w.ch.map((c, i) => c + "×" + w.cnt[i]).join(", ")}`,
        en: (l) => enumMulti(w.cnt, l),
        fm: (c) => c.map((i) => w.ch[i]).join(""),
      };
    }
    case "cs":
      return {
        nome: "Combinazioni semplici",
        o: "no",
        r: "no",
        fml: `${comI("C")}<sub>n,k</sub> = ${fr("n!", "k!·(n−k)!")}`,
        val: bComb(n, k),
        passo:
          k > n
            ? `k = ${k} è maggiore di n = ${n}: senza ripetizioni non si possono scegliere ${k} elementi su ${n}.`
            : `C(${n},${k}) = ${n}! / (${k}!·${n - k}!) = ${comProd(n, Math.min(k, n - k))} / ${Math.min(k, n - k)}!`,
        en: (l) => enumComb(n, k, l),
        fm: ins,
      };
    case "cr":
      return {
        nome: "Combinazioni con ripetizione",
        o: "no",
        r: "sì",
        fml: `${comI("C′")}<sub>n,k</sub> = ${comI("C")}<sub>n+k−1,k</sub>`,
        val: bCombRip(n, k),
        passo: `C′(${n},${k}) = C(${n}+${k}−1, ${k}) = C(${n + k - 1}, ${k})`,
        en: (l) => enumCombRip(n, k, l),
        fm: ins,
      };
    case "pc":
      return {
        nome: "Permutazioni circolari",
        o: "sì (in cerchio)",
        r: "no",
        fml: `(${comI("n")}−1)!`,
        val: bCirc(n),
        passo: `(${n}−1)! = ${Math.max(0, n - 1)}! — il primo elemento è fisso, gli altri si dispongono attorno`,
        en: (l) => enumCirc(n, l),
        fm: ord,
      };
    case "br":
      return {
        nome: "Collane (cerchio rovesciabile)",
        o: "sì (in cerchio)",
        r: "no",
        fml: `(${comI("n")}−1)! / 2`,
        val: bCollana(n),
        passo:
          n <= 2
            ? `con ${n} elementi c’è una sola collana`
            : `(${n}−1)! / 2 = ${bFmt(bFact(n - 1))} / 2`,
        en: (l) => enumCollana(n, l),
        fm: ord,
      };
    case "de":
      return {
        nome: "Sconvolgimenti (derangement)",
        o: "sì",
        r: "no",
        fml: `!${comI("n")} = ${comI("n")}!·Σ (−1)<sup>i</sup>/i!`,
        val: bDerang(n),
        passo: `!${n} = ${n}!·(1 − 1/1! + 1/2! − … ± 1/${n}!) ≈ ${n}!/e`,
        en: (l) => enumDerang(n, l),
        fm: ord,
      };
    case "st":
      if (n > 200) return null;
      return {
        nome: "Partizioni in k gruppi (Stirling)",
        o: "no",
        r: "no",
        fml: `${comI("S")}(${comI("n")},${comI("k")})`,
        val: bStirling2(n, k),
        passo: `S(${n},${k}) = ${k}·S(${n - 1},${k}) + S(${n - 1},${k - 1}) — gruppi non vuoti e non ordinati`,
        en: (l) => enumStirling(n, k, l),
        fm: (g) => g.map((b) => "{" + b.map((i) => L[i]).join(sep) + "}").join(" "),
      };
    case "pm": {
      if (!sz || !sz.length) return null;
      return {
        nome: "Principio moltiplicativo",
        o: "sì (passi in sequenza)",
        r: "—",
        fml: `${comI("n")}<sub>1</sub>·${comI("n")}<sub>2</sub>·…·${comI("n")}<sub>m</sub>`,
        val: bProd(sz),
        passo: `${sz.join(" · ")} = ${bFmt(bProd(sz))}`,
        en: (l) => enumProdotto(sz, l),
        fm: (c) => c.map((i) => i + 1).join("·"),
      };
    }
  }
  return null;
}

// Blocco a tendina con l'elenco di tutti i casi (fino a lim)
function comLista(d, lim, aperto) {
  if (d.len > 40)
    return `<p class="note"><b>${d.nome}</b>: ogni caso ha più di 40 elementi, l’elenco non viene mostrato (il totale è quello indicato sopra).</p>`;
  const tot = d.val,
    casi = tot === 0n ? [] : d.en(lim),
    sh = casi.length,
    troncato = tot > BigInt(sh);
  return (
    `<details class="cs"${aperto ? " open" : ""}><summary><b>${d.nome}</b> — ${
      tot === 0n
        ? "nessun caso"
        : troncato
          ? `primi ${fg(sh)} casi su ${bFmt(tot)}`
          : `tutti i ${fg(sh)} casi`
    }</summary>` +
    (sh
      ? `<div class="cases">${casi.map((c, i) => `<span title="caso ${fg(i + 1)}"><em>${fg(i + 1)}</em>${d.fm(c) || "∅"}</span>`).join("")}</div>`
      : "") +
    (troncato
      ? `<p class="note">Elenco limitato ai primi ${fg(sh)} casi: il totale è ${bFmt(tot)}. Riduci n o k per vederli tutti.</p>`
      : "") +
    `</details>`
  );
}

T.com = {
  n: "Calcolo combinatorio",
  s: "C",
  fm: FM.com,
  f: [
    {
      k: "tp",
      l: "Tipo di calcolo",
      t: "s",
      o: [
        ["all", "Tutti i casi (riepilogo)"],
        ["ds", "Disposizioni semplici"],
        ["dr", "Disposizioni con ripetizione"],
        ["ps", "Permutazioni semplici"],
        ["pr", "Permutazioni con ripetizione"],
        ["cs", "Combinazioni semplici"],
        ["cr", "Combinazioni con ripetizione"],
        ["pc", "Permutazioni circolari"],
        ["br", "Collane"],
        ["de", "Sconvolgimenti"],
        ["st", "Partizioni (Stirling)"],
        ["pm", "Principio moltiplicativo"],
      ],
      v: "all",
    },
    {
      k: "n",
      l: "Elementi disponibili n",
      v: 5,
      s: (v) => v.tp != "pr" && v.tp != "pm",
    },
    {
      k: "k",
      l: "Elementi scelti k",
      v: 3,
      s: (v) => ["all", "ds", "dr", "cs", "cr", "st"].includes(v.tp),
    },
    {
      k: "w",
      l: "Parola o sequenza (le lettere uguali si ripetono)",
      t: "t",
      v: "MATEMATICA",
      s: (v) => v.tp == "all" || v.tp == "pr",
    },
    {
      k: "sc",
      l: "Scelte possibili a ogni passo (separate da ;)",
      t: "a",
      v: "3; 4; 2",
      s: (v) => v.tp == "all" || v.tp == "pm",
    },
    {
      k: "el",
      l: "Elenco dei casi",
      t: "s",
      o: [
        ["s", "Mostra tutti i casi"],
        ["n", "Solo il numero totale"],
      ],
      v: "s",
    },
    {
      k: "lb",
      l: "Nome degli elementi",
      t: "s",
      o: [
        ["l", "Lettere A, B, C…"],
        ["n", "Numeri 1, 2, 3…"],
      ],
      v: "l",
      s: (v) => v.el == "s" && v.tp != "pr" && v.tp != "pm",
    },
  ],
  c(v) {
    const tp = v.tp,
      usaN = tp != "pr" && tp != "pm",
      usaK = ["all", "ds", "dr", "cs", "cr", "st"].includes(tp),
      n = Math.round(v.n),
      k = Math.round(v.k);
    if (usaN && !(n >= 0 && n <= 2000))
      return ER("Inserisci un numero n intero tra 0 e 2.000.");
    if (usaK && !(k >= 0 && k <= 2000))
      return ER("Inserisci un numero k intero tra 0 e 2.000.");
    if (tp == "st" && n > 200)
      return ER("Per i numeri di Stirling usa n fino a 200.");
    // Parola per gli anagrammi
    let w = null;
    if (tp == "all" || tp == "pr") {
      const ch = [...String(v.w).replace(/\s+/g, "").toUpperCase()];
      if (ch.length > 2000)
        return ER("La parola può avere al massimo 2.000 lettere.");
      if (ch.length) {
        const d = [...new Set(ch)];
        w = { ch: d, cnt: d.map((c) => ch.filter((x) => x == c).length) };
      }
      if (tp == "pr" && !w) return ER("Scrivi una parola o una sequenza.");
    }
    // Scelte per il principio moltiplicativo
    let sz = null;
    if (tp == "all" || tp == "pm") {
      const q = nums(v.sc).map(Math.round);
      if (q.length && q.every((x) => x >= 1 && x <= 1000)) sz = q;
      else if (tp == "pm")
        return ER("Inserisci almeno una scelta (numeri interi da 1 a 1.000).");
    }
    const nn = tp == "pr" ? w.cnt.reduce((a, b) => a + b, 0) : n,
      lab = tp == "pr" ? w.ch : usaN ? etichette(nn, v.lb) : [],
      P = {
        n: tp == "all" || usaN ? n : nn,
        k,
        w,
        sz,
        L: lab,
        sep: v.lb == "n" || n > 26 ? "·" : "",
      },
      mostra = v.el == "s";

    /* ---------- Riepilogo di tutti i tipi ---------- */
    if (tp == "all") {
      const ids = ["ds", "dr", "ps", "pr", "cs", "cr", "pc", "br", "de", "st", "pm"],
        D = ids.map((i) => [i, comDesc(i, P)]).filter((x) => x[1]),
        quattro = [
          bDisp(n, k),
          bDispRip(n, k),
          bComb(n, k),
          bCombRip(n, k),
        ],
        extra = [];
      extra.push(["Sottoinsiemi di n elementi", "2<sup>n</sup>", bDispRip(2, n)]);
      if (n <= 200) {
        extra.push(["Partizioni di n elementi (numero di Bell)", "B<sub>n</sub> = Σ S(n,k)", bBell(n)]);
        extra.push([
          "Funzioni suriettive da n elementi su k",
          "k!·S(n,k)",
          bSuriez(n, k),
        ]);
      }
      extra.push(["Funzioni da k elementi in n (come D′)", "n<sup>k</sup>", bDispRip(n, k)]);
      extra.push([
        "Funzioni iniettive da k elementi in n (come D)",
        "n!/(n−k)!",
        bDisp(n, k),
      ]);
      const rowTp = extra.map((e) => [e[0] + " — " + e[1], bFmt(e[2]), "", ""]);
      return (
        ks([
          K("Disposizioni semplici D(n,k)", bFmt(quattro[0])),
          K("Disposizioni con ripetizione D′(n,k)", bFmt(quattro[1])),
          K("Combinazioni semplici C(n,k)", bFmt(quattro[2]), 1),
          K("Combinazioni con ripetizione C′(n,k)", bFmt(quattro[3])),
        ]) +
        `<p class="note">Con n = ${fg(n)} elementi e k = ${fg(k)} scelti. Le quattro caselle qui sotto sono la «guida alla scelta»: chiediti <b>se l’ordine conta</b> e <b>se gli elementi si possono ripetere</b>.</p>` +
        TB(
          ["", "Senza ripetizione", "Con ripetizione"],
          [
            [
              "L’ordine conta",
              `Disposizioni semplici — ${bFmt(quattro[0])}`,
              `Disposizioni con ripetizione — ${bFmt(quattro[1])}`,
            ],
            [
              "L’ordine non conta",
              `Combinazioni semplici — ${bFmt(quattro[2])}`,
              `Combinazioni con ripetizione — ${bFmt(quattro[3])}`,
            ],
          ],
        ) +
        `<h3 class="sh">Tutti i tipi di raggruppamento</h3>` +
        TB(
          ["Tipo", "Casi possibili", "Ordine", "Ripetizione"],
          D.map(([, d]) => [d.nome, bFmt(d.val), d.o, d.r]).concat(rowTp),
        ).replace('<div class="tb">', '<div class="tb" style="max-height:none">') +
        (k > n
          ? `<p class="note">Con k &gt; n i raggruppamenti <b>senza ripetizione</b> sono 0 (non si possono scegliere ${fg(k)} elementi diversi su ${fg(n)}).</p>`
          : "") +
        (w
          ? `<p class="note">Anagrammi calcolati su «${w.ch.map((c, i) => c.repeat(w.cnt[i])).join("")}» (${w.cnt.reduce((a, b) => a + b, 0)} lettere).</p>`
          : "") +
        (mostra
          ? `<h3 class="sh">Elenco di tutti i casi</h3><p class="note">Apri un tipo per vedere ogni caso (fino a ${fg(COM_LIM_ALL)} per tipo; scegli il tipo in alto per vederne di più, fino a ${fg(COM_LIM)}).</p>` +
            D.map(([, d]) => comLista(d, COM_LIM_ALL, false)).join("")
          : "")
      );
    }

    /* ---------- Un tipo alla volta ---------- */
    const d = comDesc(tp, P);
    if (!d) return ER("Controlla i dati inseriti.");
    const tot = d.val,
      cifre = tot.toString().length;
    return (
      ks([
        K("Numero totale di casi", bFmt(tot), 1),
        K("Probabilità di un singolo caso (equiprobabili)", tot > 0n ? fpct(bRatio(1n, tot)) : "—"),
        K("In altre parole", tot > 0n ? bUnoSu(1n, tot) : "—"),
        K("Cifre del risultato", fg(cifre)),
      ]) +
      `<p class="note"><b>${d.nome}</b> — ordine: ${d.o} · ripetizione: ${d.r}</p>` +
      `<div class="eq">${d.fml} &nbsp;⇒&nbsp; ${d.passo}</div>` +
      (cifre > 40
        ? `<p class="note">Valore esatto (${cifre} cifre):</p><div class="big">${bFull(tot)}</div>`
        : "") +
      (tp == "pr"
        ? `<p class="note">Lettere: ${w.cnt.reduce((a, b) => a + b, 0)} · distinte: ${w.ch.length}</p>`
        : "") +
      (mostra
        ? `<h3 class="sh">Tutti i casi possibili</h3>` + comLista(d, COM_LIM, true)
        : "")
    );
  },
};
