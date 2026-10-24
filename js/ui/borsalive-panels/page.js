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
