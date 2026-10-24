// Sezione «Serie di Taylor»: approssimazione polinomiale con errore e grafico
const taylorFact = (k) => (k < 2 ? 1 : k * taylorFact(k - 1));
const TAYF = {
  exp: { f: Math.exp, d: (k, a) => Math.exp(a) },
  sin: { f: Math.sin, d: (k, a) => Math.sin(a + (k * Math.PI) / 2) },
  cos: { f: Math.cos, d: (k, a) => Math.cos(a + (k * Math.PI) / 2) },
  ln: {
    f: Math.log,
    d: (k, a) =>
      k ? ((-1) ** (k - 1) * taylorFact(k - 1)) / a ** k : Math.log(a),
  },
  geo: {
    f: (x) => 1 / (1 - x),
    d: (k, a) => taylorFact(k) / (1 - a) ** (k + 1),
  },
};
FM.tay = eq(
  `<b>Serie</b><i>f</i>(<i>x</i>) ≈ <i>T</i><sub>n</sub>(<i>x</i>) = Σ<sub>k=0..n</sub> ${fr("<i>f</i><sup>(k)</sup>(<i>a</i>)", "<i>k</i>!")}·(<i>x</i>−<i>a</i>)<sup>k</sup>`,
  `<b>Resto</b><i>R</i><sub>n</sub> = <i>f</i>(<i>x</i>) − <i>T</i><sub>n</sub>(<i>x</i>) ≈ ${fr("<i>f</i><sup>(n+1)</sup>(ξ)", "(<i>n</i>+1)!")}·(<i>x</i>−<i>a</i>)<sup>n+1</sup>`,
);
T.tay = {
  n: "Serie di Taylor",
  s: "T",
  fm: FM.tay,
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
        ["ln", "ln x"],
        ["geo", "1/(1−x)"],
      ],
    },
    { k: "a", l: "Punto di sviluppo a (0 = Maclaurin)", v: 0 },
    { k: "x", l: "Punto da approssimare x", v: 1 },
    { k: "n", l: "Ordine del polinomio n", v: 5 },
  ],
  c(v) {
    const F = TAYF[v.fn],
      n = Math.round(v.n),
      a = v.a,
      x = v.x;
    if (!(n >= 0 && n <= 30)) return ER("L'ordine deve essere tra 0 e 30.");
    if (v.fn == "ln" && !(a > 0 && x > 0))
      return ER("Per ln x servono a > 0 e x > 0.");
    if (v.fn == "geo" && (a == 1 || x == 1))
      return ER("Per 1/(1−x) servono a ≠ 1 e x ≠ 1.");
    const term = (k, p) => (F.d(k, a) / taylorFact(k)) * (p - a) ** k,
      Tn = (m, p) => {
        let s = 0;
        for (let k = 0; k <= m; k++) s += term(k, p);
        return s;
      },
      ex = F.f(x),
      ap = Tn(n, x),
      rows = [];
    let s = 0;
    for (let k = 0; k <= Math.min(n, 15); k++) {
      s += term(k, x);
      rows.push([k, f4(F.d(k, a)), f4(term(k, x)), f4(s), f4(ex - s)]);
    }
    let L = Math.max(1, 2 * Math.abs(x - a)),
      lo = a - L,
      hi = a + L;
    if (v.fn == "ln") lo = Math.max(lo, a * 0.15);
    if (v.fn == "geo")
      a < 1
        ? ((hi = Math.min(hi, 0.9)), (lo = Math.max(lo, -3)))
        : ((lo = Math.max(lo, 1.1)), (hi = Math.min(hi, 5)));
    const xs = [...Array(61)].map((_, j) => lo + ((hi - lo) * j) / 60),
      cl = (y) => Math.max(-50, Math.min(50, y));
    return (
      ks([
        K("f(x) esatto", f4(ex), 1),
        K("Tₙ(x)", f4(ap)),
        K("Errore assoluto", f4(Math.abs(ex - ap))),
        K(
          "Errore relativo",
          ex ? f2(Math.abs((ex - ap) / ex) * 100) + "%" : "—",
        ),
      ]) +
      TB(["k", "f⁽ᵏ⁾(a)", "Termine k", "Somma parziale", "Errore"], rows) +
      `<p class="note">Lo sviluppo converge solo vicino ad a: per ln x e 1/(1−x) il raggio di convergenza è limitato (|x−a| < a oppure |x−a| < |1−a|).</p>` +
      plot({
        t: "Funzione e polinomio di Taylor",
        xs,
        lines: [
          { n: "f(x)", c: PAL[0], a: 1, v: xs.map((p) => cl(F.f(p))) },
          { n: "Tₙ(x)", c: PAL[3], d: "5 4", v: xs.map((p) => cl(Tn(n, p))) },
          { n: "T₁(x)", c: PAL[1], d: "2 3", v: xs.map((p) => cl(Tn(1, p))) },
        ],
        marks: [{ x, y: cl(ex), c: PAL[2], l: "f(" + f2(x) + ") = " + f4(ex) }],
        xf: (p) => f2(p),
        lb: xs.map((p) => "x = " + f2(p)),
      })
    );
  },
};
