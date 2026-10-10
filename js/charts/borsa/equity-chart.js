// Borsa Live · curva del capitale (SVG con area sfumata; verde se in guadagno, rosso se in perdita)
BL.eqInner = () => {
  const d = BL.S.curve,
    W = 800,
    H = 220,
    pad = 15,
    mn = Math.min(...d),
    rg = Math.max(...d) - mn || 1,
    pts = d.map((v, i) => ({
      x: pad + (i / Math.max(d.length - 1, 1)) * (W - pad * 2),
      y: H - pad - ((v - mn) / rg) * (H - pad * 2),
    })),
    line = pts.map((p, i) => (i ? "L" : "M") + ` ${p.x} ${p.y}`).join(" "),
    last = pts[pts.length - 1],
    area = `${line} L ${last.x} ${H} L ${pts[0].x} ${H} Z`,
    col = d[d.length - 1] >= d[0] ? "var(--bl-up)" : "var(--bl-dn)";
  return `<g style="color:${col}"><defs><linearGradient id="bl-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="currentColor" stop-opacity="0.3"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs><path d="${area}" fill="url(#bl-grad)"/><path d="${line}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="${last.x}" cy="${last.y}" r="5" fill="currentColor"/></g>`;
};
