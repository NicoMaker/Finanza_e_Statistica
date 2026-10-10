// Borsa Live · pannelli dell'interfaccia (KPI, strategia, posizioni, diario), aggiornamento e messaggi
BL.kpi = () => {
  const S = BL.S,
    t = BL.total(),
    p = ((t - S.cap0) / S.cap0) * 100,
    n = S.wins + S.losses;
  return ks([
    K("Capitale", BLF.eu(t), 1),
    K(
      "P&amp;L",
      `<span class="bl-${p >= 0 ? "up" : "dn"}">${BLF.sg(p)}${f2(p)}%</span>`,
    ),
    K("Operazioni", S.trades.length),
    K("Win rate", n ? Math.round((S.wins / n) * 100) + "%" : "—"),
    K("Cash", BLF.eu(S.cash)),
    K("Posizioni", Object.keys(S.pos).length),
  ]);
};

BL.stratHtml = () => {
  const m = BL_STRATEGIE[BL.S.mode];
  return `<div class="bl-strat"><div class="bl-sn">${m.name}</div><p>${m.desc}</p><div class="bl-tags">${m.tags.map((t) => `<span class="bl-tag ${t.c || ""}">${t.t}</span>`).join("")}</div></div>`;
};

BL.posHtml = () => {
  const S = BL.S,
    e = Object.entries(S.pos);
  if (!e.length)
    return `<div class="bl-empty"><span>🎯</span>Il robot sta analizzando il mercato…<br>Aspetta che trovi la prima opportunità!</div>`;
  return e
    .map(([sym, p]) => {
      const cur = S.prices[sym],
        r = ((cur - p.avg) / p.avg) * 100;
      return `<div class="bl-pos"><div class="bl-sym">${sym}</div><div class="bl-pi"><div>${p.qty} azioni</div><small>P. medio: ${BLF.usd(p.avg)}</small></div><div class="bl-pv"><b>${BLF.usd(cur * p.qty)}</b><span class="bl-${r >= 0 ? "up" : "dn"}">${BLF.sg(r)}${f2(r)}%</span></div></div>`;
    })
    .join("");
};

BL.logHtml = () => {
  const ic = { buy: "🟢", sell: "🔴", info: "ℹ️", hold: "⏸️" };
  return BL.S.log
    .map(
      (e) =>
        `<div class="bl-le"><div class="bl-li ${e.type}">${ic[e.type]}</div><div class="bl-lc"><b>${e.title}</b><p>${e.reason}</p><small>${BLF.ora(e.time)}</small></div></div>`,
    )
    .join("");
};

// Pagina completa della scheda
BL.page = () =>
  `<div class="bl"><div class="bl-pill"><span class="bl-dot"></span>Robot attivo</div>` +
  `<p class="note">Simulazione didattica: i prezzi sono generati a caso e non sono quotazioni reali. Il robot decide ogni 4 secondi finché questa scheda resta aperta.</p>` +
  `<div id="bl-kpi">${BL.kpi()}</div>` +
  `<div class="bl-grid"><div class="bl-col">` +
  `<div class="bl-panel"><div class="bl-ph">🎛️ Strategia</div><div class="bl-pb">${BL.stratHtml()}</div></div>` +
  `<div class="bl-panel"><div class="bl-ph">📈 Curva del capitale<small id="bl-time">${BLF.ora(new Date())}</small></div><div class="bl-pb"><div class="bl-chart"><svg id="bl-eq" viewBox="0 0 800 220" preserveAspectRatio="none">${BL.eqInner()}</svg></div></div></div>` +
  `<div class="bl-panel"><div class="bl-ph">💼 Posizioni aperte<small id="bl-n">${Object.keys(BL.S.pos).length} aperture</small></div><div class="bl-pb" id="bl-pos">${BL.posHtml()}</div></div>` +
  `</div><div class="bl-col"><div class="bl-panel"><div class="bl-ph">🧠 Diario del robot<small>ultimi eventi</small></div><div class="bl-log" id="bl-log">${BL.logHtml()}</div>` +
  `<div class="bl-ctl"><button type="button" data-bl="force">⚡ Forza decisione</button><button type="button" data-bl="sell">💰 Liquida tutto</button><button type="button" class="dg" data-bl="reset">🔄 Reset</button></div></div></div></div></div>`;

// Aggiorna solo le parti dinamiche, senza ricostruire la pagina
BL.refresh = () => {
  const set = (id, h) => {
    const e = document.getElementById(id);
    if (e) e.innerHTML = h;
  };
  set("bl-kpi", BL.kpi());
  set("bl-eq", BL.eqInner());
  set("bl-pos", BL.posHtml());
  set("bl-log", BL.logHtml());
  set("bl-n", `${Object.keys(BL.S.pos).length} aperture`);
  set("bl-time", BLF.ora(new Date()));
};

// Passo della simulazione + aggiornamento a schermo
BL.tick = () => {
  BL.passo();
  BL.refresh();
};

let blToast, blToastTm;
BL.toast = (msg) => {
  if (!blToast) {
    blToast = document.createElement("div");
    blToast.className = "bl-toast";
    document.body.appendChild(blToast);
  }
  blToast.textContent = msg;
  blToast.classList.add("show");
  clearTimeout(blToastTm);
  blToastTm = setTimeout(() => blToast.classList.remove("show"), 2200);
};
