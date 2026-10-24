// Sezione «Polinomio di McLaurin»: campi e risultati (matematica, grafico e formule stanno in file separati)
T.mac = {
  n: "Polinomio di McLaurin",
  s: "M",
  fm: FM.mac,
  f: [
    {
      k: "fn",
      l: "Funzione",
      t: "s",
      v: "exp",
      o: [
        ["exp", "eˣ"],
        ["sin", "sin x"],
        ["cos", "cos x"],
        ["ln", "ln(1+x)"],
        ["geo", "1/(1−x)"],
        ["bin", "(1+x)^α"],
        ["tan", "tan x"],
        ["atan", "arctan x"],
        ["sinh", "sinh x"],
        ["cosh", "cosh x"],
        ["cu", "Scrivi tu la funzione"],
      ],
    },
    {
      k: "ex",
      l: "Funzione f(x), per esempio x*exp(-x^2) oppure sin(x)/(1+x^2)",
      t: "t",
      v: "x*exp(x)",
      s: (v) => v.fn == "cu",
    },
    { k: "al", l: "Esponente α", v: 0.5, s: (v) => v.fn == "bin" },
    { k: "x", l: "Punto da approssimare x", v: 1 },
    { k: "n", l: "Grado del polinomio n", v: 5 },
  ],
  c(v) {
    const n = Math.round(v.n),
      err = macCheck(v, n);
    if (err) return ER(err);
    let F;
    try {
      F = macFn(v);
    } catch (e) {
      return ER(e.message);
    }
    const ex = F.f(v.x, v.al),
      ap = macPn(F, n, v.x, v.al);
    if (!Number.isFinite(ex) || !Number.isFinite(ap))
      return ER("f(x) non è definita in x = " + v.x + ".");
    return (
      ks([
        K("f(x) esatto", f4(ex), 1),
        K("Pₙ(x)", f4(ap)),
        K("Errore assoluto", f4(Math.abs(ex - ap))),
        K(
          "Errore relativo",
          ex ? f2(Math.abs((ex - ap) / ex) * 100) + "%" : "—",
        ),
      ]) +
      `<p class="note">${macPolyHtml(F, n, v.al)}</p>` +
      TB(
        [
          "k",
          "f⁽ᵏ⁾(0)",
          "Coefficiente f⁽ᵏ⁾(0)/k!",
          "Termine k",
          "Somma parziale",
          "Errore",
        ],
        macRows(F, n, v.x, v.al, ex),
      ) +
      (MACF[v.fn]
        ? `<p class="note">McLaurin è Taylor con a = 0: il polinomio approssima bene f vicino a 0 e converge solo dentro il raggio di convergenza (infinito per eˣ, sin x, cos x; 1 per ln(1+x), 1/(1−x) e (1+x)^α).</p>`
        : `<p class="note">McLaurin è Taylor con a = 0: il polinomio vale solo vicino a 0, entro il raggio di convergenza, che arriva fino alla singolarità più vicina (per esempio tan x e arctan x convergono per |x| &lt; π/2 e |x| &lt; 1). ${v.fn == "cu" ? SX_AIUTO : ""}</p>`) +
      macChart(F, v, n, ex)
    );
  },
};
