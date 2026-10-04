// Grafico VAN / TIR
function npvCh(f, r, van, irr) {
  const N = (x) => f.reduce((s, c, k) => s + c / (1 + x) ** k, 0),
    xs = f.map((_, k) => k),
    ip = isNaN(irr) ? 0 : irr * 100;
  let A = 0;
  const cum = f.map((c, k) => (A += c / (1 + r) ** k)),
    xa = Math.max(-90, Math.min(0, ip * 1.3)),
    xb = Math.max(20, r * 160, ip * 1.4),
    rs = [...Array(51)].map((_, j) => xa + ((xb - xa) * j) / 50);
  return (
    plot({
      t: "Flussi di cassa e VAN cumulato",
      xs,
      stack: 1,
      bars: [
        { n: "Entrate", c: PAL[2], v: f.map((c) => (c > 0 ? c : 0)) },
        { n: "Uscite", c: PAL[3], v: f.map((c) => (c < 0 ? c : 0)) },
      ],
      lines: [{ n: "VAN cumulato", c: PAL[1], v: cum }],
      lb: xs.map((k) => "t = " + k),
    }) +
    plot({
      t: "VAN al variare del tasso",
      xs: rs,
      zero: 1,
      lines: [{ n: "VAN", c: PAL[0], a: 1, v: rs.map((x) => N(x / 100)) }],
      marks: [
        {
          x: r * 100,
          y: van,
          c: PAL[1],
          l: "VAN " + f2(van) + " al " + f2(r * 100) + "%",
        },
      ].concat(
        isNaN(irr)
          ? []
          : [{ x: ip, y: 0, c: PAL[3], l: "TIR " + f2(ip) + "%" }],
      ),
      xf: (x) => sh(x) + "%",
      lb: rs.map((x) => "Tasso " + f2(x) + "%"),
    })
  );
}
