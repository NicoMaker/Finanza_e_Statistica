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
