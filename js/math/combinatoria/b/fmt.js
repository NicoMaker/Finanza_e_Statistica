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
