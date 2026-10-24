BL.posHtml = () => {
  const S = BL.S,
    e = Object.entries(S.pos);
  if (!e.length)
    return `<div class="bl-empty"><span>🎯</span>Il robot sta analizzando il mercato…<br>Aspetta che trovi la prima opportunità!</div>`;
  return e
    .map(([sym, p]) => {
      const cur = S.prices[sym],
        r = ((cur - p.avg) / p.avg) * 100;
      return `<div class="bl-pos"><div class="bl-sym">${sym}</div><div class="bl-pi"><div>${fg(p.qty)} azioni</div><small>P. medio: ${BLF.usd(p.avg)}</small></div><div class="bl-pv"><b>${BLF.usd(cur * p.qty)}</b><span class="bl-${r >= 0 ? "up" : "dn"}">${BLF.sg(r)}${f2(r)}%</span></div></div>`;
    })
    .join("");
};
