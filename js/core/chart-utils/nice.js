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
