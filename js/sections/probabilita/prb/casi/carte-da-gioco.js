// Caso «Carte da gioco»
T.prb.casi.ca = function (v) {
  const tp = v.tp;
  const N = v.mz == "40" ? 40 : 52,
    n = Math.round(v.cn),
    k = Math.round(v.ck),
    sem = N / 4,
    K_ = { as: 4, pr: 1, se: sem, fi: 12, al: Math.round(v.Kc) }[v.bs],
    senza = v.mo == "s";
  if (!(K_ >= 0 && K_ <= N))
    return ER(`Le carte «buone» devono essere tra 0 e ${N}.`);
  if (!(n >= 1 && n <= (senza ? N : 200)))
    return ER(
      senza
        ? `Senza reinserimento puoi pescare da 1 a ${N} carte.`
        : "Puoi pescare da 1 a 200 carte.",
    );
  if (!(k >= 0 && k <= n))
    return ER("Le carte «buone» k devono essere tra 0 e le carte pescate n.");
  const nome = {
      as: "un asso",
      pr: "quella carta precisa",
      se: "una carta del seme",
      fi: "una figura",
      al: "una carta buona",
    }[v.bs],
    // senza reinserimento (ipergeometrica) e con reinserimento (binomiale)
    pS = (j) => hypP(N, K_, n, j),
    pC = (j) => binPmf(n, j, K_ / N),
    favS = hypNum(N, K_, n, k),
    totS = bComb(N, n),
    favC =
      bComb(n, k) * BigInt(K_) ** BigInt(k) * BigInt(N - K_) ** BigInt(n - k),
    totC = bDispRip(N, n),
    okS = n <= N && k <= K_ && n - k <= N - K_,
    f = senza ? pS : pC,
    lo = senza ? Math.max(0, n - (N - K_)) : 0,
    hi = senza ? Math.min(n, K_) : n,
    xs = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i),
    ps = xs.map(f),
    W = prFinestra(xs, ps),
    P = senza ? bRatio(favS, totS) : bRatio(favC, totC),
    fav = senza ? favS : favC,
    tot = senza ? totS : totC,
    rows = [
      [
        `Esattamente ${fg(k)}`,
        n <= N ? fpct(bRatio(favS, totS)) : "—",
        fpct(bRatio(favC, totC)),
      ],
      ["Nessuna", n <= N ? fpct(pS(0)) : "—", fpct(pC(0))],
      ["Almeno una", n <= N ? fpct(1 - pS(0)) : "—", fpct(1 - pC(0))],
      ["Tutte e " + fg(n), n <= N ? fpct(pS(n)) : "—", fpct(pC(n))],
    ];
  return (
    ks([
      K(`P(esattamente ${fg(k)} su ${fg(n)})`, fpct(P), 1),
      K("In altre parole", bUnoSu(fav, tot)),
      K("P(almeno una)", fpct(1 - f(0))),
      K("P(nessuna)", fpct(f(0))),
      K("Casi favorevoli", bFmt(fav)),
      K(senza ? "Casi possibili C(N,n)" : "Sequenze possibili N^n", bFmt(tot)),
    ]) +
    `<p class="note">Mazzo da ${N} carte, ${fg(K_)} «buone» (${nome}). ${
      n == 1
        ? `Con una sola carta: P = ${fg(K_)}/${N} = ${fpct(K_ / N)} (${prU(K_ / N)}), uguale con o senza reinserimento.`
        : senza
          ? `Senza reinserimento ogni carta pescata resta fuori: le pescate dipendono l’una dall’altra (ipergeometrica).`
          : `Con reinserimento la carta torna nel mazzo e la probabilità resta ${fpct(K_ / N)} a ogni pescata (binomiale).`
    }</p>` +
    `<h3 class="sh">Con e senza reinserimento a confronto</h3>` +
    TB(["Caso", "Senza reinserimento", "Con reinserimento"], rows) +
    (okS || !senza
      ? ""
      : `<p class="note">Con questi numeri, senza reinserimento, il caso scelto è impossibile.</p>`) +
    prBarre(
      senza
        ? "Quante «buone» escono (senza reinserimento)"
        : "Quante «buone» escono (con reinserimento)",
      W.xs,
      W.ps,
      "k =",
    ) +
    (W.tagliato ? "" : prTab("k", W.xs, W.ps))
  );
};
