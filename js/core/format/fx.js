// Riscrive i numeri di un testo con le migliaia, mantenendo i decimali digitati
const fx = (s) =>
  String(s).replace(/[+-]?\d[\d.]*(?:,\d*)?/g, (m) => {
    const v = pn(m);
    if (!isFinite(v)) return m;
    const c = m.indexOf(","),
      p = m.indexOf("."),
      d =
        c >= 0
          ? m.length - c - 1
          : !MIGL.test(m) && p >= 0
            ? m.length - p - 1
            : 0;
    return nf(v, { minimumFractionDigits: d, maximumFractionDigits: d });
  });
