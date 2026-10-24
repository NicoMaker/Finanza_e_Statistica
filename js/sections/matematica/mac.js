// Sezione «Polinomio di McLaurin»: formula di Taylor centrata in a = 0, con coefficienti, resto e grafico
const macFact = (k) => (k < 2 ? 1 : k * macFact(k - 1));
// d(k, α) = derivata k-esima di f calcolata in 0; f(x, α) = valore esatto della funzione
const MACF = {
  exp: { f: (x) => Math.exp(x), d: () => 1 },
  sin: { f: (x) => Math.sin(x), d: (k) => [0, 1, 0, -1][k % 4] },
  cos: { f: (x) => Math.cos(x), d: (k) => [1, 0, -1, 0][k % 4] },
  ln: {
    f: (x) => Math.log(1 + x),
    d: (k) => (k ? (-1) ** (k - 1) * macFact(k - 1) : 0),
  },
  geo: { f: (x) => 1 / (1 - x), d: (k) => macFact(k) },
  bin: {
    f: (x, al) => (1 + x) ** al,
    d: (k, al) => {
      let p = 1;
      for (let j = 0; j < k; j++) p *= al - j;
      return p;
    },
  },
};
const macNum = (c) => (Number.isInteger(c) ? String(c) : String(+c.toPrecision(6)));
FM.mac = eq(
  `<b>Taylor</b><i>T</i><sub>n</sub>(<i>x</i>) = Σ<sub>k=0..n</sub> ${fr("<i>f</i><sup>(k)</sup>(<i>a</i>)", "<i>k</i>!")}·(<i>x</i>−<i>a</i>)<sup>k</sup>`,
  `<b>McLaurin</b>(<i>a</i> = 0) <i>P</i><sub>n</sub>(<i>x</i>) = Σ<sub>k=0..n</sub> ${fr("<i>f</i><sup>(k)</sup>(0)", "<i>k</i>!")}·<i>x</i><sup>k</sup> = <i>f</i>(0) + <i>f</i>′(0)·<i>x</i> + ${fr("<i>f</i>″(0)", "2!")}·<i>x</i><sup>2</sup> + … + ${fr("<i>f</i><sup>(n)</sup>(0)", "<i>n</i>!")}·<i>x</i><sup>n</sup>`,
  `<b>Resto</b><i>R</i><sub>n</sub>(<i>x</i>) = <i>f</i>(<i>x</i>) − <i>P</i><sub>n</sub>(<i>x</i>) = ${fr("<i>f</i><sup>(n+1)</sup>(ξ)", "(<i>n</i>+1)!")}·<i>x</i><sup>n+1</sup>, con ξ tra 0 e <i>x</i>`,
  `<b>eˣ</b><i>e</i><sup>x</sup> = Σ<sub>k≥0</sub> ${fr("<i>x</i><sup>k</sup>", "<i>k</i>!")} = 1 + <i>x</i> + ${fr("<i>x</i><sup>2</sup>", "2!")} + ${fr("<i>x</i><sup>3</sup>", "3!")} + …`,
  `<b>sin x</b>sin <i>x</i> = Σ<sub>k≥0</sub> (−1)<sup>k</sup> ${fr("<i>x</i><sup>2k+1</sup>", "(2<i>k</i>+1)!")} = <i>x</i> − ${fr("<i>x</i><sup>3</sup>", "3!")} + ${fr("<i>x</i><sup>5</sup>", "5!")} − …`,
  `<b>cos x</b>cos <i>x</i> = Σ<sub>k≥0</sub> (−1)<sup>k</sup> ${fr("<i>x</i><sup>2k</sup>", "(2<i>k</i>)!")} = 1 − ${fr("<i>x</i><sup>2</sup>", "2!")} + ${fr("<i>x</i><sup>4</sup>", "4!")} − …`,
  `<b>ln(1+x)</b>ln(1+<i>x</i>) = Σ<sub>k≥1</sub> (−1)<sup>k+1</sup> ${fr("<i>x</i><sup>k</sup>", "<i>k</i>")} = <i>x</i> − ${fr("<i>x</i><sup>2</sup>", "2")} + ${fr("<i>x</i><sup>3</sup>", "3")} − …, per −1 &lt; <i>x</i> ≤ 1`,
  `<b>1/(1−x)</b>${fr("1", "1−<i>x</i>")} = Σ<sub>k≥0</sub> <i>x</i><sup>k</sup> = 1 + <i>x</i> + <i>x</i><sup>2</sup> + …, per |<i>x</i>| &lt; 1`,
  `<b>(1+x)<sup>α</sup></b>(1+<i>x</i>)<sup>α</sup> = Σ<sub>k≥0</sub> C(α, <i>k</i>)·<i>x</i><sup>k</sup>, con C(α, <i>k</i>) = ${fr("α(α−1)…(α−<i>k</i>+1)", "<i>k</i>!")}, per |<i>x</i>| &lt; 1`,
);
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
      ],
    },
    {
      k: "al",
      l: "Esponente α",
      v: 0.5,
      s: (v) => v.fn == "bin",
    },
    { k: "x", l: "Punto da approssimare x", v: 1 },
    { k: "n", l: "Grado del polinomio n", v: 5 },
  ],
  c(v) {
    const F = MACF[v.fn],
      n = Math.round(v.n),
      al = v.al,
      x = v.x;
    if (!(n >= 0 && n <= 30)) return ER("Il grado deve essere tra 0 e 30.");
    const poly = v.fn == "bin" && Number.isInteger(al) && al >= 0;
    if (v.fn == "ln" && !(x > -1 && x <= 1))
      return ER("Per ln(1+x) la serie converge per −1 < x ≤ 1.");
    if (v.fn == "geo" && !(Math.abs(x) < 1))
      return ER("Per 1/(1−x) la serie converge solo per |x| < 1.");
    if (v.fn == "bin" && !poly && !(Math.abs(x) < 1))
      return ER(
        "Per (1+x)^α la serie converge per |x| < 1 (se α non è un intero ≥ 0).",
      );
    // coefficiente di McLaurin c_k = f^(k)(0) / k!
    const dk = (k) => F.d(k, al),
      ck = (k) => dk(k) / macFact(k),
      term = (k, p) => ck(k) * p ** k,
      Pn = (m, p) => {
        let s = 0;
        for (let k = 0; k <= m; k++) s += term(k, p);
        return s;
      },
      ex = F.f(x, al),
      ap = Pn(n, x),
      rows = [];
    let s = 0;
    for (let k = 0; k <= Math.min(n, 15); k++) {
      s += term(k, x);
      rows.push([
        k,
        f4(dk(k)),
        f4(ck(k)),
        f4(term(k, x)),
        f4(s),
        f4(ex - s),
      ]);
    }
    // polinomio scritto per esteso (solo i termini con coefficiente diverso da zero)
    const parts = [];
    for (let k = 0; k <= n; k++) {
      const c = ck(k);
      if (Math.abs(c) < 1e-12) continue;
      const mag = macNum(Math.abs(c)),
        pw = k == 0 ? "" : k == 1 ? "<i>x</i>" : `<i>x</i><sup>${k}</sup>`,
        body = k == 0 ? mag : mag == "1" ? pw : mag + "·" + pw;
      parts.push((parts.length ? (c < 0 ? " − " : " + ") : c < 0 ? "−" : "") + body);
    }
    const shown = parts.slice(0, 8).join("") + (parts.length > 8 ? " + …" : ""),
      pol = `<i>P</i><sub>${n}</sub>(<i>x</i>) = ${shown || "0"}`;
    let L = Math.max(1, 2 * Math.abs(x)),
      lo = -L,
      hi = L;
    if (v.fn == "ln") lo = Math.min(Math.max(lo, -0.9), x);
    if (v.fn == "geo" || (v.fn == "bin" && !poly)) {
      lo = Math.min(Math.max(lo, v.fn == "geo" ? -3 : -0.9), x);
      hi = Math.max(Math.min(hi, 0.95), x);
    }
    if (v.fn == "bin" && poly) lo = Math.max(lo, -L);
    const xs = [...Array(61)].map((_, j) => lo + ((hi - lo) * j) / 60),
      cl = (y) => Math.max(-50, Math.min(50, y));
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
      `<p class="note">${pol}</p>` +
      TB(
        ["k", "f⁽ᵏ⁾(0)", "Coefficiente f⁽ᵏ⁾(0)/k!", "Termine k", "Somma parziale", "Errore"],
        rows,
      ) +
      `<p class="note">McLaurin è Taylor con a = 0: il polinomio approssima bene f vicino a 0 e converge solo dentro il raggio di convergenza (infinito per eˣ, sin x, cos x; 1 per ln(1+x), 1/(1−x) e (1+x)^α).</p>` +
      plot({
        t: "Funzione e polinomio di McLaurin",
        xs,
        lines: [
          { n: "f(x)", c: PAL[0], a: 1, v: xs.map((p) => cl(F.f(p, al))) },
          { n: "Pₙ(x)", c: PAL[3], d: "5 4", v: xs.map((p) => cl(Pn(n, p))) },
          { n: "P₁(x)", c: PAL[1], d: "2 3", v: xs.map((p) => cl(Pn(1, p))) },
        ],
        marks: [{ x, y: cl(ex), c: PAL[2], l: "f(" + f2(x) + ") = " + f4(ex) }],
        xf: (p) => f2(p),
        lb: xs.map((p) => "x = " + f2(p)),
      })
    );
  },
};
