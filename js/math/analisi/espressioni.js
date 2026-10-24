// Funzioni scritte dall'utente (es. "x*exp(-x^2)"): lettura del testo, valore numerico e coefficienti di Taylor.
// I coefficienti si ottengono con la derivazione automatica su serie troncate: nessuna derivata numerica,
// quindi nessun errore di arrotondamento anche per ordini alti. Usato dalle schede Taylor e McLaurin.
const sxFact = (k) => (k < 2 ? 1 : k * sxFact(k - 1));

// Funzioni riconosciute (log = logaritmo naturale)
const SX_FN = {
  exp: Math.exp,
  ln: Math.log,
  log: Math.log,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  atan: Math.atan,
  asin: Math.asin,
  sqrt: Math.sqrt,
};
// Funzioni pronte da scegliere nel form: stesso motore, espressione già scritta
const SXP = {
  tan: "tan(x)",
  atan: "atan(x)",
  asin: "asin(x)",
  sinh: "sinh(x)",
  cosh: "cosh(x)",
  sqrt: "sqrt(x)",
  inv: "1/x",
  gauss: "exp(-x^2)",
  lor: "1/(1+x^2)",
  xex: "x*exp(x)",
};
const SX_AIUTO =
  "Puoi scrivere la formula anche come y = …: usa x, + − * / ^, parentesi, pi, e, exp, ln, sin, cos, tan, sinh, cosh, tanh, atan, asin, sqrt (il prodotto può essere sottinteso: 2x, x(1+x)).";

// ---- Lettura del testo: da stringa a elenco di simboli
const sxTok = (src) => {
  const s = String(src)
      .toLowerCase()
      .replace(/,/g, ".")
      .replace(/π/g, "pi")
      .replace(/\*\*/g, "^")
      .replace(/[×·]/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/²/g, "^2")
      .replace(/³/g, "^3")
      .replace(/^\s*(y|f\s*\(\s*x\s*\))\s*=\s*/, ""), // accetta anche «y = …» e «f(x) = …»
    t = [],
    re = /\s*(\d+\.?\d*|\.\d+|[a-z_]\w*|[-+*/^()])/y;
  let p = 0;
  while (p < s.length) {
    re.lastIndex = p;
    const m = re.exec(s);
    if (!m) {
      if (/^\s*$/.test(s.slice(p))) break;
      throw new Error(
        "Carattere non riconosciuto: «" + s.slice(p).trim().charAt(0) + "».",
      );
    }
    t.push(m[1]);
    p = re.lastIndex;
  }
  return t;
};

// ---- Da elenco di simboli ad albero dell'espressione
const sxParse = (src) => {
  const t = sxTok(src),
    isNum = (s) => /^[\d.]/.test(s),
    isId = (s) => /^[a-z_]/.test(s);
  let i = 0;
  const peek = () => t[i],
    next = () => t[i++],
    close = () => {
      if (next() != ")") throw new Error("Manca una parentesi chiusa.");
    },
    primary = () => {
      const p = next();
      if (p === undefined) throw new Error("Espressione incompleta.");
      if (isNum(p)) {
        const v = parseFloat(p);
        if (isNaN(v)) throw new Error("Numero non valido: «" + p + "».");
        return { t: "n", v };
      }
      if (p == "(") {
        const a = expr();
        close();
        return a;
      }
      if (isId(p)) {
        if (p == "x") return { t: "x" };
        if (p == "pi") return { t: "n", v: Math.PI };
        if (p == "e") return { t: "n", v: Math.E };
        if (SX_FN[p]) {
          let a;
          if (peek() == "(") {
            next();
            a = expr();
            close();
          } else a = power();
          return { t: "f", n: p, a };
        }
        throw new Error("«" + p + "» non è riconosciuto: " + SX_AIUTO);
      }
      throw new Error("Simbolo non valido: «" + p + "».");
    },
    power = () => {
      const a = primary();
      if (peek() == "^") {
        next();
        return { t: "b", o: "^", a, b: unary() };
      }
      return a;
    },
    unary = () => {
      const p = peek();
      if (p == "-") {
        next();
        return { t: "u", a: unary() };
      }
      if (p == "+") {
        next();
        return unary();
      }
      return power();
    },
    term = () => {
      let a = unary();
      for (;;) {
        const p = peek();
        if (p == "*" || p == "/") {
          next();
          a = { t: "b", o: p, a, b: unary() };
        } else if (p !== undefined && (isNum(p) || isId(p) || p == "(")) {
          a = { t: "b", o: "*", a, b: power() }; // prodotto sottinteso: 2x, x(1+x), 2sin(x)
        } else break;
      }
      return a;
    },
    expr = () => {
      let a = term();
      while (peek() == "+" || peek() == "-") {
        const o = next();
        a = { t: "b", o, a, b: term() };
      }
      return a;
    };
  const r = expr();
  if (i < t.length)
    throw new Error("Espressione non valida vicino a «" + t[i] + "».");
  return r;
};

// ---- Valore numerico di f(x)
const sxNum = (n, x) => {
  switch (n.t) {
    case "n":
      return n.v;
    case "x":
      return x;
    case "u":
      return -sxNum(n.a, x);
    case "b": {
      const a = sxNum(n.a, x),
        b = sxNum(n.b, x);
      return n.o == "+"
        ? a + b
        : n.o == "-"
          ? a - b
          : n.o == "*"
            ? a * b
            : n.o == "/"
              ? a / b
              : a ** b;
    }
    default:
      return SX_FN[n.n](sxNum(n.a, x));
  }
};

// ---- Aritmetica sulle serie troncate (array dei coefficienti c0..cN)
const sxZ = (N) => Array(N + 1).fill(0),
  sxK = (c, N) => {
    const r = sxZ(N);
    r[0] = c;
    return r;
  },
  sxAdd = (a, b) => a.map((v, i) => v + b[i]),
  sxSub = (a, b) => a.map((v, i) => v - b[i]),
  sxNeg = (a) => a.map((v) => -v),
  sxMul = (a, b) => {
    const N = a.length - 1,
      r = sxZ(N);
    for (let i = 0; i <= N; i++)
      for (let j = 0; i + j <= N; j++) r[i + j] += a[i] * b[j];
    return r;
  },
  sxDiv = (a, b) => {
    if (b[0] == 0) throw new Error("Divisione per zero nel punto di sviluppo.");
    const N = a.length - 1,
      q = sxZ(N);
    for (let k = 0; k <= N; k++) {
      let s = a[k];
      for (let j = 1; j <= k; j++) s -= b[j] * q[k - j];
      q[k] = s / b[0];
    }
    return q;
  },
  sxExp = (u) => {
    const N = u.length - 1,
      e = sxZ(N);
    e[0] = Math.exp(u[0]);
    for (let k = 1; k <= N; k++) {
      let s = 0;
      for (let j = 1; j <= k; j++) s += j * u[j] * e[k - j];
      e[k] = s / k;
    }
    return e;
  },
  sxLn = (u) => {
    if (!(u[0] > 0))
      throw new Error(
        "ln e le potenze non intere richiedono un valore positivo nel punto di sviluppo.",
      );
    const N = u.length - 1,
      l = sxZ(N);
    l[0] = Math.log(u[0]);
    for (let k = 1; k <= N; k++) {
      let s = k * u[k];
      for (let j = 1; j < k; j++) s -= j * l[j] * u[k - j];
      l[k] = s / (k * u[0]);
    }
    return l;
  },
  // seno e coseno (h = false) oppure seno e coseno iperbolici (h = true)
  sxSC = (u, h) => {
    const N = u.length - 1,
      s = sxZ(N),
      c = sxZ(N);
    s[0] = h ? Math.sinh(u[0]) : Math.sin(u[0]);
    c[0] = h ? Math.cosh(u[0]) : Math.cos(u[0]);
    for (let k = 1; k <= N; k++) {
      let a = 0,
        b = 0;
      for (let j = 1; j <= k; j++) {
        a += j * u[j] * c[k - j];
        b += j * u[j] * s[k - j];
      }
      s[k] = a / k;
      c[k] = (h ? b : -b) / k;
    }
    return [s, c];
  },
  sxAtan = (u) => {
    const N = u.length - 1,
      a = sxZ(N),
      w = sxZ(N);
    a[0] = Math.atan(u[0]);
    for (let i = 0; i < N; i++) w[i] = (i + 1) * u[i + 1];
    const q = sxDiv(w, sxAdd(sxK(1, N), sxMul(u, u)));
    for (let k = 1; k <= N; k++) a[k] = q[k - 1] / k;
    return a;
  },
  sxPow = (u, p) => {
    const N = u.length - 1,
      cost = p.slice(1).every((v) => v == 0);
    if (cost && Number.isInteger(p[0]) && Math.abs(p[0]) <= 200) {
      let r = sxK(1, N);
      for (let i = 0; i < Math.abs(p[0]); i++) r = sxMul(r, u);
      return p[0] < 0 ? sxDiv(sxK(1, N), r) : r;
    }
    return sxExp(sxMul(p, sxLn(u)));
  };

// ---- Valuta l'albero con le serie: restituisce i coefficienti di Taylor di f nel punto scelto
const sxSer = (n, X) => {
  const N = X.length - 1;
  switch (n.t) {
    case "n":
      return sxK(n.v, N);
    case "x":
      return X;
    case "u":
      return sxNeg(sxSer(n.a, X));
    case "b": {
      const a = sxSer(n.a, X),
        b = sxSer(n.b, X);
      return n.o == "+"
        ? sxAdd(a, b)
        : n.o == "-"
          ? sxSub(a, b)
          : n.o == "*"
            ? sxMul(a, b)
            : n.o == "/"
              ? sxDiv(a, b)
              : sxPow(a, b);
    }
    default: {
      const u = sxSer(n.a, X);
      switch (n.n) {
        case "exp":
          return sxExp(u);
        case "ln":
        case "log":
          return sxLn(u);
        case "sin":
          return sxSC(u, false)[0];
        case "cos":
          return sxSC(u, false)[1];
        case "tan": {
          const [s, c] = sxSC(u, false);
          return sxDiv(s, c);
        }
        case "sinh":
          return sxSC(u, true)[0];
        case "cosh":
          return sxSC(u, true)[1];
        case "tanh": {
          const [s, c] = sxSC(u, true);
          return sxDiv(s, c);
        }
        case "atan":
          return sxAtan(u);
        case "asin": {
          // (arcsin u)' = u' / √(1−u²)
          const N2 = u.length - 1,
            w = sxZ(N2);
          for (let i = 0; i < N2; i++) w[i] = (i + 1) * u[i + 1];
          const d = sxSub(sxK(1, N2), sxMul(u, u));
          if (!(d[0] > 0))
            throw new Error("arcsin richiede un punto di sviluppo tra −1 e 1.");
          const q = sxDiv(w, sxPow(d, sxK(0.5, N2))),
            r = sxZ(N2);
          r[0] = Math.asin(u[0]);
          for (let k = 1; k <= N2; k++) r[k] = q[k - 1] / k;
          return r;
        }
        default:
          return sxPow(u, sxK(0.5, N)); // sqrt
      }
    }
  }
};

// Funzione pronta per le schede: f(x) esatto e derivata k-esima nel punto a (stessa forma delle funzioni predefinite)
// Lancia un Error con messaggio leggibile se il testo non è valido o f non è sviluppabile in a
function sxFn(src, a, N) {
  if (!String(src).trim())
    throw new Error("Scrivi una funzione, per esempio x*exp(x).");
  const ast = sxParse(src),
    X = sxZ(N);
  X[0] = a;
  X[1] = 1;
  const c = sxSer(ast, X);
  if (!c.every(Number.isFinite) || Math.abs(c[0]) > 1e12)
    throw new Error(
      "La funzione non è definita o derivabile nel punto di sviluppo a = " +
        a +
        ".",
    );
  return { f: (x) => sxNum(ast, x), d: (k) => c[k] * sxFact(k), custom: 1 };
}

// Ascisse del grafico (61 punti): salta quelle in cui f non è definita, così la curva non si rompe
const sxXs = (f, lo, hi) =>
  [...Array(61)]
    .map((_, j) => lo + ((hi - lo) * j) / 60)
    .filter((p) => Number.isFinite(f(p)));
