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
const nums = (s) =>
  s
    .split(/[;\s]+/)
    .filter(Boolean)
    .map((x) => parseFloat(x.replace(",", ".")))
    .filter((x) => !isNaN(x));
const K = (l, v, h) =>
  `<div class="k${h ? " h" : ""}"><span>${l}</span><b>${v}</b></div>`;
const ks = (a) => `<div class="ks">${a.join("")}</div>`;
