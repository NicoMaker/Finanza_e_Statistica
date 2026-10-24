const fv = (v) =>
  typeof v == "number"
    ? isFinite(v) && (v === 0 || Math.abs(v) >= 1e-6)
      ? nf(v, { maximumFractionDigits: 10 })
      : String(v)
    : /e/i.test(v)
      ? String(v)
      : fx(v);
