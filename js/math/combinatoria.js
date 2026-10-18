// Calcolo combinatorio esatto (BigInt) + elenco di tutti i casi possibili
// Nessuna dipendenza: le funzioni sono globali, come negli altri file di js/math/.

/* ---------- Numeri esatti (BigInt) ---------- */
const _fc = [1n];
// n! (con memoria: i fattoriali già calcolati non si rifanno)
function bFact(n) {
  n = Math.max(0, Math.floor(n));
  for (let i = _fc.length; i <= n; i++) _fc[i] = _fc[i - 1] * BigInt(i);
  return _fc[n];
}
// Coefficiente binomiale C(n,k) = n! / (k!(n−k)!)
function bComb(n, k) {
  if (k < 0 || k > n) return 0n;
  if (k > n - k) k = n - k;
  let r = 1n;
  for (let i = 1; i <= k; i++) r = (r * BigInt(n - k + i)) / BigInt(i);
  return r;
}
// Disposizioni semplici D(n,k) = n·(n−1)·…·(n−k+1)
function bDisp(n, k) {
  if (k < 0 || k > n) return 0n;
  let r = 1n;
  for (let i = 0; i < k; i++) r *= BigInt(n - i);
  return r;
}
// Disposizioni con ripetizione D'(n,k) = n^k
const bDispRip = (n, k) => BigInt(n) ** BigInt(k);
// Combinazioni con ripetizione C'(n,k) = C(n+k−1, k)
function bCombRip(n, k) {
  if (k === 0) return 1n;
  if (n === 0) return 0n;
  return bComb(n + k - 1, k);
}
// Permutazioni con ripetizione (anagrammi / coefficiente multinomiale): n! / (n1!·n2!·…)
function bMulti(cs) {
  const n = cs.reduce((a, b) => a + b, 0);
  return cs.reduce((r, c) => r / bFact(c), bFact(n));
}
// Permutazioni circolari (n−1)!  e  collane/braccialetti (n−1)!/2 (si possono rovesciare)
const bCirc = (n) => (n <= 1 ? 1n : bFact(n - 1));
const bCollana = (n) => (n <= 2 ? 1n : bFact(n - 1) / 2n);
// Sconvolgimenti (derangement) !n: permutazioni senza punti fissi
function bDerang(n) {
  let a = 1n,
    b = 0n; // !0, !1
  if (n === 0) return 1n;
  for (let i = 2; i <= n; i++) [a, b] = [b, BigInt(i - 1) * (a + b)];
  return b;
}
// Numeri di Stirling di 2ª specie S(n,k): partizioni di n elementi in k gruppi non vuoti
// (le righe già calcolate si ricordano: la riga n si costruisce dalla riga n−1)
const _st = [[1n]];
function _stRiga(n) {
  for (let i = _st.length; i <= n; i++) {
    const prev = _st[i - 1],
      nx = Array(i + 1).fill(0n);
    for (let j = 1; j <= i; j++)
      nx[j] = BigInt(j) * (prev[j] || 0n) + (prev[j - 1] || 0n);
    _st.push(nx);
  }
  return _st[n];
}
const bStirling2 = (n, k) => (k < 0 || k > n ? 0n : _stRiga(n)[k]);
// Numero di Bell B(n): tutte le partizioni di un insieme di n elementi
const bBell = (n) => _stRiga(n).reduce((a, b) => a + b, 0n);
// Funzioni suriettive da n elementi su k: k!·S(n,k)
const bSuriez = (n, k) => bFact(k) * bStirling2(n, k);
// Prodotto di una lista di BigInt (principio moltiplicativo)
const bProd = (a) => a.reduce((r, x) => r * BigInt(x), 1n);

/* ---------- Da BigInt a numeri e testo ---------- */
// Rapporto a/b come numero (anche se a e b sono enormi o a è minuscolo rispetto a b)
function bRatio(a, b) {
  if (b === 0n) return NaN;
  if (a === 0n) return 0;
  const P = Math.max(0, b.toString().length - a.toString().length + 20);
  const q = (a * 10n ** BigInt(P)) / b;
  return parseFloat(q.toString() + "e-" + P);
}
// Mantissa e potenza di dieci di un BigInt
const _bSci = (b) => {
  const s = b.toString(),
    m = s[0] + (s.length > 1 ? "," + s.slice(1, 5).replace(/0+$/, "") : "");
  return [m.replace(/,$/, ""), s.length - 1, s.length];
};
// Numero esatto con il punto sulle migliaia (1.234.567); oltre 40 cifre → notazione scientifica
function bFmt(b) {
  const s = b.toString(),
    neg = s[0] === "-",
    d = neg ? s.slice(1) : s;
  if (d.length <= 40)
    return (neg ? "−" : "") + d.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const [m, e, L] = _bSci(b);
  return `≈ ${m} × 10<sup>${e}</sup> <small>(${L} cifre)</small>`;
}
// Tutte le cifre, a gruppi di tre, anche per numeri molto grandi
const bFull = (b) => b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
// Probabilità come percentuale leggibile (anche per valori minuscoli)
function fpct(p) {
  if (!isFinite(p)) return "—";
  if (p === 0) return "0%";
  const x = p * 100;
  if (Math.abs(x) < 1e-4)
    return (
      x.toExponential(3).replace(".", ",").replace(/e([+-]?\d+)/, (m, e) => ` × 10<sup>${e.replace("-", "−").replace("+", "")}</sup>`) + "%"
    );
  return nf(x, { maximumSignificantDigits: 6 }) + "%";
}
// «1 su N» per un rapporto a/b di BigInt
function bUnoSu(a, b) {
  if (a === 0n) return "mai";
  const q = (b * 100n) / a; // due decimali
  const i = q / 100n,
    d = q % 100n;
  return "1 su " + bFmt(i) + (i < 1000n && d ? "," + String(d).padStart(2, "0") : "");
}

/* ---------- Etichette degli elementi ---------- */
// Elementi A, B, C… (fino a 26) oppure 1, 2, 3…
function etichette(n, tipo) {
  const L = [];
  for (let i = 0; i < n; i++)
    L.push(tipo === "n" || n > 26 ? String(i + 1) : String.fromCharCode(65 + i));
  return L;
}

/* ---------- Elenco di TUTTI i casi (si ferma a lim) ---------- */
// Ogni funzione restituisce un array di casi; ogni caso è un array di indici (0..n−1).
function enumDisp(n, k, lim) {
  const out = [],
    cur = [],
    used = Array(n).fill(false);
  (function rec() {
    if (out.length >= lim) return;
    if (cur.length === k) return void out.push(cur.slice());
    for (let i = 0; i < n && out.length < lim; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(i);
      rec();
      cur.pop();
      used[i] = false;
    }
  })();
  return out;
}
function enumDispRip(n, k, lim) {
  const out = [],
    cur = [];
  (function rec() {
    if (out.length >= lim) return;
    if (cur.length === k) return void out.push(cur.slice());
    for (let i = 0; i < n && out.length < lim; i++) {
      cur.push(i);
      rec();
      cur.pop();
    }
  })();
  return out;
}
const enumPerm = (n, lim) => enumDisp(n, n, lim);
function enumComb(n, k, lim) {
  const out = [],
    cur = [];
  (function rec(s) {
    if (out.length >= lim) return;
    if (cur.length === k) return void out.push(cur.slice());
    for (let i = s; i < n && out.length < lim; i++) {
      cur.push(i);
      rec(i + 1);
      cur.pop();
    }
  })(0);
  return out;
}
function enumCombRip(n, k, lim) {
  const out = [],
    cur = [];
  (function rec(s) {
    if (out.length >= lim) return;
    if (cur.length === k) return void out.push(cur.slice());
    for (let i = s; i < n && out.length < lim; i++) {
      cur.push(i);
      rec(i); // lo stesso elemento può tornare
      cur.pop();
    }
  })(0);
  return out;
}
// Anagrammi di un multinsieme: cnt[i] = quante volte compare l'elemento i
function enumMulti(cnt, lim) {
  const tot = cnt.reduce((a, b) => a + b, 0),
    c = cnt.slice(),
    out = [],
    cur = [];
  (function rec() {
    if (out.length >= lim) return;
    if (cur.length === tot) return void out.push(cur.slice());
    for (let i = 0; i < c.length && out.length < lim; i++) {
      if (!c[i]) continue;
      c[i]--;
      cur.push(i);
      rec();
      cur.pop();
      c[i]++;
    }
  })();
  return out;
}
// Giri di tavolo: il primo elemento è fisso, gli altri si permutano
function enumCirc(n, lim) {
  if (n <= 1) return n ? [[0]] : [[]];
  return enumPerm(n - 1, lim).map((p) => [0, ...p.map((x) => x + 1)]);
}
// Collane: come i giri di tavolo, ma una collana rovesciata è la stessa collana
function enumCollana(n, lim) {
  if (n <= 2) return enumCirc(n, lim);
  const out = [],
    cur = [0],
    used = Array(n).fill(false);
  used[0] = true;
  (function rec() {
    if (out.length >= lim) return;
    if (cur.length === n) {
      if (cur[1] < cur[n - 1]) out.push(cur.slice()); // una sola delle due «versioni» rovesciate
      return;
    }
    for (let i = 1; i < n && out.length < lim; i++) {
      if (used[i]) continue;
      used[i] = true;
      cur.push(i);
      rec();
      cur.pop();
      used[i] = false;
    }
  })();
  return out;
}
// Sconvolgimenti: nessun elemento resta al suo posto
function enumDerang(n, lim) {
  const out = [],
    cur = [],
    used = Array(n).fill(false);
  (function rec() {
    if (out.length >= lim) return;
    const p = cur.length;
    if (p === n) return void out.push(cur.slice());
    for (let i = 0; i < n && out.length < lim; i++) {
      if (used[i] || i === p) continue;
      used[i] = true;
      cur.push(i);
      rec();
      cur.pop();
      used[i] = false;
    }
  })();
  return out;
}
// Partizioni di {0..n−1} in esattamente k gruppi non vuoti (stringhe a crescita limitata)
function enumStirling(n, k, lim) {
  const out = [],
    a = [];
  (function rec(i, m) {
    if (out.length >= lim) return;
    if (n - i < k - m) return; // non si fa più in tempo a creare i gruppi
    if (i === n) {
      if (m === k) {
        const g = Array.from({ length: k }, () => []);
        a.forEach((b, x) => g[b].push(x));
        out.push(g);
      }
      return;
    }
    for (let b = 0; b <= Math.min(m, k - 1) && out.length < lim; b++) {
      a.push(b);
      rec(i + 1, Math.max(m, b + 1));
      a.pop();
    }
  })(0, 0);
  return out;
}
// Principio moltiplicativo: una scelta per ogni passo (sizes = opzioni di ciascun passo)
function enumProdotto(sizes, lim) {
  const out = [],
    cur = [];
  (function rec(i) {
    if (out.length >= lim) return;
    if (i === sizes.length) return void out.push(cur.slice());
    for (let j = 0; j < sizes[i] && out.length < lim; j++) {
      cur.push(j);
      rec(i + 1);
      cur.pop();
    }
  })(0);
  return out;
}
