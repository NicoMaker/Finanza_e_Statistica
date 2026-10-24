// Calcolo dei risultati
T.com.c = function (v) {
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
    const ids = [
        "ds",
        "dr",
        "ps",
        "pr",
        "cs",
        "cr",
        "pc",
        "br",
        "de",
        "st",
        "pm",
      ],
      D = ids.map((i) => [i, comDesc(i, P)]).filter((x) => x[1]),
      quattro = [bDisp(n, k), bDispRip(n, k), bComb(n, k), bCombRip(n, k)],
      extra = [];
    extra.push(["Sottoinsiemi di n elementi", "2<sup>n</sup>", bDispRip(2, n)]);
    if (n <= 200) {
      extra.push([
        "Partizioni di n elementi (numero di Bell)",
        "B<sub>n</sub> = Σ S(n,k)",
        bBell(n),
      ]);
      extra.push([
        "Funzioni suriettive da n elementi su k",
        "k!·S(n,k)",
        bSuriez(n, k),
      ]);
    }
    extra.push([
      "Funzioni da k elementi in n (come D′)",
      "n<sup>k</sup>",
      bDispRip(n, k),
    ]);
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
      ).replace(
        '<div class="tb">',
        '<div class="tb" style="max-height:none">',
      ) +
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
      K(
        "Probabilità di un singolo caso (equiprobabili)",
        tot > 0n ? fpct(bRatio(1n, tot)) : "—",
      ),
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
      ? `<h3 class="sh">Tutti i casi possibili</h3>` +
        comLista(d, COM_LIM, true)
      : "")
  );
};
