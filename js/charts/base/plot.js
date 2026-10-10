// Motore generico dei grafici SVG (linee, barre, assi, tooltip)
function plot(o) {
  const W = Math.min(760, out.clientWidth || 600),
    S = W < 420,
    H = S ? 215 : 260,
    L = S ? 42 : 50,
    R = 10,
    T = 16,
    B = 30,
    id = "g" + gid++,
    xs = o.xs,
    bs = o.bars || [],
    ls = o.lines || [],
    yf = o.yf || f2,
    xf = o.xf || sh,
    n = xs.length,
    all = [...bs, ...ls],
    vals = [];
  if (bs.length || o.zero) vals.push(0);
  xs.forEach((_, i) => {
    let p = 0,
      q = 0;
    bs.forEach((b) => {
      const v = b.v[i];
      if (o.stack) {
        v >= 0 ? (p += v) : (q += v);
      } else vals.push(v);
    });
    if (o.stack) vals.push(p, q);
  });
  ls.forEach((l) => vals.push(...l.v));
  (o.marks || []).forEach((m) => vals.push(m.y));
  let lo = Math.min(...vals),
    hi = Math.max(...vals);
  if (!bs.length && !o.zero) {
    const p = (hi - lo) * 0.06 || 1;
    lo -= p;
    hi += p;
  }
  const yt = nice(lo, hi),
    y0 = yt[0],
    y1 = yt[yt.length - 1],
    xm = Math.min(...xs),
    xM = Math.max(...xs),
    st = n > 1 ? (xM - xm) / (n - 1) : 1;
  let x0 = xm,
    x1 = xM;
  if (bs.length) {
    x0 -= st / 2;
    x1 += st / 2;
  } else if (x0 == x1) {
    x0--;
    x1++;
  }
  const X = (x) => L + ((x - x0) / (x1 - x0)) * (W - L - R),
    Y = (y) => T + ((y1 - y) / (y1 - y0)) * (H - T - B),
    b0 = Y(Math.min(Math.max(0, y0), y1));
  let s = `<defs>${ls.map((l, i) => (l.a ? `<linearGradient id="${id}${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${l.c}" stop-opacity=".35"/><stop offset="1" stop-color="${l.c}" stop-opacity="0"/></linearGradient>` : "")).join("")}</defs>`;
  yt.forEach(
    (t) =>
      (s += `<line class="gr" x1="${L}" x2="${W - R}" y1="${Y(t)}" y2="${Y(t)}"/><text class="ax" x="${L - 6}" y="${Y(t) + 3.5}" text-anchor="end">${sh(t)}</text>`),
  );
  if (y0 < 0 && y1 > 0)
    s += `<line class="z" x1="${L}" x2="${W - R}" y1="${Y(0)}" y2="${Y(0)}"/>`;
  nice(xm, xM, S ? 4 : 7)
    .filter((t) => t >= xm - 1e-9 && t <= xM + 1e-9)
    .forEach(
      (t) =>
        (s += `<text class="ax" x="${X(t)}" y="${H - 10}" text-anchor="middle">${xf(t)}</text>`),
    );
  const bw = X(x0 + st) - X(x0),
    gw = (bw * 0.7) / (o.stack ? 1 : bs.length),
    ps = Array(n).fill(0),
    ng = Array(n).fill(0);
  bs.forEach((b, k) =>
    xs.forEach((x, i) => {
      const v = b.v[i];
      if (!v) return;
      let a = 0;
      if (o.stack) {
        a = v >= 0 ? ps[i] : ng[i];
        v >= 0 ? (ps[i] += v) : (ng[i] += v);
      }
      const yA = Y(a),
        yB = Y(a + v),
        xl =
          X(x) - (gw * (o.stack ? 1 : bs.length)) / 2 + (o.stack ? 0 : k * gw);
      s += `<rect x="${xl}" y="${Math.min(yA, yB)}" width="${Math.max(1, gw)}" height="${Math.max(1, Math.abs(yA - yB))}" rx="${Math.min(3, gw / 2)}" fill="${b.c}" opacity=".92"/>`;
    }),
  );
  ls.forEach((l, k) => {
    const d = xs
      .map(
        (x, i) =>
          (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(l.v[i]).toFixed(1),
      )
      .join("");
    if (l.a)
      s += `<path d="${d}L${X(xs[n - 1])} ${b0}L${X(xs[0])} ${b0}Z" fill="url(#${id}${k})"/>`;
    s += `<path d="${d}" fill="none" stroke="${l.c}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"${l.d ? ` stroke-dasharray="${l.d}"` : ""}/>`;
  });
  const k = Math.ceil(n / 120),
    hw = (W - L - R) / Math.ceil(n / k);
  xs.forEach((x, i) => {
    if (i % k) return;
    const tp =
      `<b>${o.lb ? o.lb[i] : xf(x)}</b><br>` +
      all
        .map(
          (q) =>
            `<i style='background:${q.c}'></i>${q.n}: <b>${yf(q.v[i])}</b>`,
        )
        .join("<br>");
    s += `<rect class="hit" x="${X(x) - hw / 2}" y="${T}" width="${hw}" height="${H - T - B}" data-tip="${tp}"/>`;
  });
  (o.vl || []).forEach((m) => {
    const x = X(m.x);
    s += `<line x1="${x}" x2="${x}" y1="${T}" y2="${H - B}" stroke="${m.c}" stroke-width="1.5" stroke-dasharray="4 4"/><text class="ax" x="${Math.min(W - R - 50, Math.max(L + 50, x))}" y="${T - 4}" text-anchor="middle" style="fill:${m.c};font-weight:700">${m.l}</text>`;
  });
  (o.marks || []).forEach(
    (m) =>
      (s += `<circle cx="${X(m.x)}" cy="${Y(m.y)}" r="5.5" fill="${m.c}" stroke="var(--card)" stroke-width="2" data-tip="${m.l}"/>`),
  );
  return `<div class="ch"><h3>${o.t}</h3><div class="lg">${all.map((q) => `<span><i style="background:${q.c}"></i>${q.n}</span>`).join("")}</div><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg></div>`;
}
