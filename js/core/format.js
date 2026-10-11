// Formattatori numerici e piccoli helper HTML per i risultati
// Separatore delle migliaia sempre attivo (1.000 · 1.000.000): "it-IT" da solo lo omette sui numeri
// a 4 cifre (1000), mentre "de-DE" ha gli stessi separatori (punto migliaia, virgola decimali) ma
// raggruppa già da 1.000.
const nf = (n, o) => (+n).toLocaleString("de-DE", o);
const f2 = (n) =>
  isFinite(n)
    ? nf(n, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "—";
const f4 = (n) =>
  isFinite(n)
    ? nf(n, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      })
    : "—";
// Numero "così com'è" (interi e decimali brevi) con il punto sulle migliaia: periodi, rate, quantità
const fg = (n) => (isFinite(n) ? nf(n, { maximumFractionDigits: 6 }) : "—");
// Numeri nei campi: il punto separa le migliaia (1.000) e la virgola i decimali (1.234,5).
// Un punto non seguito da esattamente 3 cifre (es. 0.5) resta un decimale, come prima.
const MIGL = /^[+-]?[1-9]\d{0,2}(\.\d{3})+(,\d*)?$/;
const pn = (s) => {
  s = String(s).trim();
  return parseFloat((MIGL.test(s) ? s.replace(/\./g, "") : s).replace(",", "."));
};
// Riscrive i numeri di un testo con le migliaia, mantenendo i decimali digitati
const fx = (s) =>
  String(s).replace(/[+-]?\d[\d.]*(?:,\d*)?/g, (m) => {
    const v = pn(m);
    if (!isFinite(v)) return m;
    const c = m.indexOf(","),
      p = m.indexOf("."),
      d = c >= 0 ? m.length - c - 1 : !MIGL.test(m) && p >= 0 ? m.length - p - 1 : 0;
    return nf(v, { minimumFractionDigits: d, maximumFractionDigits: d });
  });
// Valore per un campo: i numeri del codice si formattano direttamente (1.645 → "1,645"), i testi con fx
// Mentre si scrive: raggruppa le cifre intere con il punto e lascia intatti virgola e decimali digitati
// (un punto "da decimale" come 1.5 o 0.25 non viene toccato). Es. 1234567,5 → 1.234.567,5
const fl = (s) =>
  String(s).replace(/[+-]?\d[\d.]*(?:,\d*)?/g, (m) => {
    const c = m.indexOf(","),
      a = c >= 0 ? m.slice(0, c) : m,
      dec = c >= 0 ? m.slice(c) : "";
    if (c < 0 && a.includes(".") && !/^[+-]?[1-9]\d*(\.\d{3,})+$/.test(a))
      return m;
    return (
      (/^[+-]/.test(a) ? a[0] : "") +
      a.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
      dec
    );
  });
const fv = (v) =>
  typeof v == "number"
    ? isFinite(v) && (v === 0 || Math.abs(v) >= 1e-6)
      ? nf(v, { maximumFractionDigits: 10 })
      : String(v)
    : /e/i.test(v)
      ? String(v)
      : fx(v);
const nums = (s) =>
  s
    .split(/[;\s]+/)
    .filter(Boolean)
    .map((x) => pn(x))
    .filter((x) => !isNaN(x));
const K = (l, v, h) =>
  `<div class="k${h ? " h" : ""}"><span>${l}</span><b>${v}</b></div>`;
const ks = (a) => `<div class="ks">${a.join("")}</div>`;
