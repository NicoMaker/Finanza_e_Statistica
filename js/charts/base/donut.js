// Grafico a ciambella
function donut(t, p, c) {
  const tot = p.reduce((a, x) => a + x.v, 0) || 1,
    r = 54,
    C = 2 * Math.PI * r;
  let o = 0;
  const arcs = p
    .map((x) => {
      const l = (x.v / tot) * C,
        e = `<circle cx="70" cy="70" r="${r}" fill="none" stroke="${x.c}" stroke-width="18" stroke-dasharray="${l} ${C - l}" stroke-dashoffset="${-o}" transform="rotate(-90 70 70)" data-tip="<i style='background:${x.c}'></i>${x.n}: <b>${f2(x.v)}</b>"/>`;
      o += l;
      return e;
    })
    .join("");
  return `<div class="ch dn"><svg width="140" height="140" viewBox="0 0 140 140">${arcs}<text x="70" y="70" text-anchor="middle" style="font-size:19px;font-weight:700;fill:var(--tx)">${f2((p[1].v / tot) * 100)}%</text><text class="ax" x="70" y="87" text-anchor="middle">${c}</text></svg><div><h3>${t}</h3><div class="lg">${p.map((x) => `<span><i style="background:${x.c}"></i>${x.n}: <b>${f2(x.v)}</b></span>`).join("")}</div></div></div>`;
}
