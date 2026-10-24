// Caso «Eventi A e B»
T.prb.casi.ev = function (v) {
  const tp = v.tp;
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
  nota =
    v.rl == "inc"
      ? "incompatibili (non possono accadere insieme)"
      : ind
        ? "indipendenti"
        : "dipendenti";
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
};
