// Matematica pura del polinomio di McLaurin (Taylor con a = 0): nessun HTML, solo numeri e testi
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

// Funzione scelta nel form: predefinita (derivate note) oppure pronta (math/espressioni.js).
// Lancia un Error leggibile se la funzione non è sviluppabile in 0
const macFn = (v) => MACF[v.fn] || sxFn(v.fn == "cu" ? v.ex : SXP[v.fn], 0, 30);

// (1+x)^α è un vero polinomio quando α è un intero ≥ 0
const macIsPoly = (fn, al) => fn == "bin" && Number.isInteger(al) && al >= 0;

// coefficiente di McLaurin c_k = f^(k)(0) / k!
const macCoef = (F, k, al) => F.d(k, al) / macFact(k);
const macTerm = (F, k, p, al) => macCoef(F, k, al) * p ** k;
const macPn = (F, m, p, al) => {
  let s = 0;
  for (let k = 0; k <= m; k++) s += macTerm(F, k, p, al);
  return s;
};

// Controlla grado e raggio di convergenza: restituisce il messaggio d'errore, oppure "" se tutto va bene
const macCheck = (v, n) => {
  if (!(n >= 0 && n <= 30)) return "Il grado deve essere tra 0 e 30.";
  if (v.fn == "ln" && !(v.x > -1 && v.x <= 1))
    return "Per ln(1+x) la serie converge per −1 < x ≤ 1.";
  if (v.fn == "geo" && !(Math.abs(v.x) < 1))
    return "Per 1/(1−x) la serie converge solo per |x| < 1.";
  if (v.fn == "bin" && !macIsPoly(v.fn, v.al) && !(Math.abs(v.x) < 1))
    return "Per (1+x)^α la serie converge per |x| < 1 (se α non è un intero ≥ 0).";
  return "";
};

// Righe della tabella: [k, f^(k)(0), coefficiente, termine, somma parziale, errore] (massimo 16 righe)
const macRows = (F, n, x, al, ex) => {
  const rows = [];
  let s = 0;
  for (let k = 0; k <= Math.min(n, 15); k++) {
    s += macTerm(F, k, x, al);
    rows.push([
      k,
      f4(F.d(k, al)),
      f4(macCoef(F, k, al)),
      f4(macTerm(F, k, x, al)),
      f4(s),
      f4(ex - s),
    ]);
  }
  return rows;
};

// Polinomio scritto per esteso (solo i termini con coefficiente diverso da zero, al massimo 8)
const macNum = (c) =>
  Number.isInteger(c) ? String(c) : String(+c.toPrecision(6));
const macPolyHtml = (F, n, al) => {
  const parts = [];
  for (let k = 0; k <= n; k++) {
    const c = macCoef(F, k, al);
    if (Math.abs(c) < 1e-12) continue;
    const mag = macNum(Math.abs(c)),
      pw = k == 0 ? "" : k == 1 ? "<i>x</i>" : `<i>x</i><sup>${k}</sup>`,
      body = k == 0 ? mag : mag == "1" ? pw : mag + "·" + pw,
      sign = parts.length ? (c < 0 ? " − " : " + ") : c < 0 ? "−" : "";
    parts.push(sign + body);
  }
  const shown = parts.slice(0, 8).join("") + (parts.length > 8 ? " + …" : "");
  return `<i>P</i><sub>${n}</sub>(<i>x</i>) = ${shown || "0"}`;
};

// Intervallo del grafico: sempre centrato in 0 e sempre contenente x
const macRange = (fn, x, al) => {
  const L = Math.max(1, 2 * Math.abs(x)),
    poly = macIsPoly(fn, al);
  let lo = -L,
    hi = L;
  if (fn == "ln") lo = Math.min(Math.max(lo, -0.9), x);
  if (fn == "geo" || (fn == "bin" && !poly)) {
    lo = Math.min(Math.max(lo, fn == "geo" ? -3 : -0.9), x);
    hi = Math.max(Math.min(hi, 0.95), x);
  }
  return [lo, hi];
};
