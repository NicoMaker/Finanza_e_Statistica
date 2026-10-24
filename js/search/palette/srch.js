const srch = (q) => {
  const w = nz(q).split(/\s+/).filter(Boolean);
  return ALL.map((o) => {
    const h = nz(o[1] + " " + o[2] + " " + T[o[0]].n);
    let sc = 0;
    for (const x of w) {
      const j = h.indexOf(x);
      if (j < 0) return null;
      sc += j;
    }
    return [sc, o];
  })
    .filter(Boolean)
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1])
    .slice(0, 40);
};
