// Caso «Urna a più colori»
T.prb.casi.ur = function (v) {
  const tp = v.tp;
  const U = nums(v.un).map(Math.round),
    E = nums(v.ue).map(Math.round),
    c = U.length;
  if (c < 2 || E.length != c)
    return ER("Inserisci almeno due colori e lo stesso numero di estratte.");
  if (U.some((x) => x < 0) || E.some((x) => x < 0))
    return ER("Servono numeri non negativi.");
  const N = U.reduce((a, b) => a + b, 0),
    m = E.reduce((a, b) => a + b, 0);
  if (N < 1 || N > 5000)
    return ER("Le palline totali devono essere tra 1 e 5.000.");
  if (m < 1 || m > N)
    return ER(
      "Le palline estratte devono essere almeno 1 e al massimo quante sono nell’urna.",
    );
  const ok = E.every((e, i) => e <= U[i]),
    senza = ok ? U.reduce((r, u, i) => r * bComb(u, E[i]), 1n) : 0n,
    tot = bComb(N, m),
    // con reinserimento: sequenze ordinate favorevoli = m!/∏k! · ∏ n_i^k_i ; totali N^m
    conFav =
      bMulti(E) * U.reduce((r, u, i) => r * BigInt(u) ** BigInt(E[i]), 1n),
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
      [
        "Colore",
        "Nell’urna",
        "Estratte",
        "Modi di sceglierle C(nᵢ,kᵢ)",
        "P(colore) a ogni estrazione",
      ],
      U.map((u, i) => [
        i + 1,
        fg(u),
        fg(E[i]),
        bFmt(bComb(u, E[i])),
        fpct(u / N),
      ]),
    ) +
    `<p class="note">Totale ${fg(N)} palline, ne estrai ${fg(m)}. <b>Senza reinserimento</b> ogni pallina estratta non rientra; <b>con reinserimento</b> si rimette nell’urna e il colore si può ripetere.${ok ? "" : " Hai chiesto più palline di un colore di quelle presenti: senza reinserimento è impossibile."}</p>`
  );
};
