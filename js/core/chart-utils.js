// Palette, id univoci, scala "nice" per gli assi e abbreviazione numeri
const PAL = ["#3b6fd8", "#d4a62a", "#12a07a", "#e0475f"];
let gid = 0;
const nice = (a, b, n = 5) => {
  const r = b - a || 1,
    s = 10 ** Math.floor(Math.log10(r / n)),
    e = r / n / s,
    st = (e < 1.5 ? 1 : e < 3 ? 2 : e < 7 ? 5 : 10) * s,
    t = [];
  for (let v = Math.floor(a / st + 1e-9) * st; v <= b + st * 0.001; v += st)
    t.push(+v.toFixed(10));
  return t;
};
const sh = (n) => {
  const a = Math.abs(n);
  return a >= 1e6
    ? (n / 1e6).toLocaleString("it-IT", { maximumFractionDigits: 1 }) + " M"
    : a >= 1e4
      ? (n / 1e3).toLocaleString("it-IT", { maximumFractionDigits: 1 }) + " k"
      : n.toLocaleString("it-IT", { maximumFractionDigits: 2 });
};
