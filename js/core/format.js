// Formattatori numerici e piccoli helper HTML per i risultati
const f2 = (n) =>
  isFinite(n)
    ? n.toLocaleString("it-IT", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "—";
const f4 = (n) =>
  isFinite(n)
    ? n.toLocaleString("it-IT", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      })
    : "—";
const nums = (s) =>
  s
    .split(/[;\s]+/)
    .filter(Boolean)
    .map((x) => parseFloat(x.replace(",", ".")))
    .filter((x) => !isNaN(x));
const K = (l, v, h) =>
  `<div class="k${h ? " h" : ""}"><span>${l}</span><b>${v}</b></div>`;
const ks = (a) => `<div class="ks">${a.join("")}</div>`;
