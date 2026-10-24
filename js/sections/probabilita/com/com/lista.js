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
