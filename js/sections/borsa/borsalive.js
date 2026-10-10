// Sezione «Borsa Live»: formule (FM.bl) e scheda (T.bl) del robot di trading simulato
// Logica in js/math/borsa-*.js, dati in js/data/borsa-*.js, grafico in js/charts/borsa/, pannelli in js/ui/borsalive-panels.js
// I prezzi sono generati a caso: è una simulazione didattica, non quotazioni reali.
FM.bl = eq(
  `<b>Valore totale</b><i>V</i> = <i>C</i> + Σ <i>q</i><sub>j</sub>·<i>P</i><sub>j</sub>`,
  `<b>Rendimento posizione</b><i>r</i> = ${fr("<i>P</i> − <i>P</i><sub>m</sub>", "<i>P</i><sub>m</sub>")}·100`,
  `<b>P&amp;L totale</b>${fr("<i>V</i> − <i>V</i><sub>0</sub>", "<i>V</i><sub>0</sub>")}·100`,
  `<b>Vendita</b><i>r</i> ≥ soglia di profitto &nbsp;oppure&nbsp; <i>r</i> ≤ −6%`,
);

BL.init(BL.S.cap0);

// Pulsanti della scheda (forza decisione, liquida tutto, reset)
out.addEventListener("click", (e) => {
  const b = e.target.closest && e.target.closest("[data-bl]");
  if (!b) return;
  const a = b.dataset.bl;
  if (a == "force") {
    BL.tick();
    BL.toast("⚡ Il robot ha preso una decisione");
  } else if (a == "sell") {
    if (!BL.liquida()) return BL.toast("Nessuna posizione da liquidare");
    BL.refresh();
    BL.toast("💰 Tutte le posizioni liquidate");
  } else if (a == "reset") {
    if (!confirm("Vuoi davvero resettare tutto? Il robot ripartirà da zero."))
      return;
    BL.init(BL.S.cap0);
    BL.refresh();
    BL.toast("🔄 Robot resettato");
  }
});

// Il robot lavora ogni 4 secondi, solo mentre la scheda è aperta
const blLive = () => cur == "bl" && !atHome && document.getElementById("bl-log");
setInterval(() => {
  if (blLive()) BL.tick();
}, 4000);

T.bl = {
  n: "Borsa Live",
  s: "€",
  fm: FM.bl,
  // getter: riaprendo la scheda i comandi riflettono lo stato attuale del robot
  get f() {
    return [
      {
        k: "m",
        l: "Strategia del robot",
        t: "s",
        o: [
          ["balanced", "Bilanciata"],
          ["aggressive", "Aggressiva"],
          ["conservative", "Conservativa"],
        ],
        v: BL.S.mode,
      },
      { k: "cap", l: "Capitale iniziale (€)", v: BL.S.cap0 },
    ];
  },
  c(v) {
    const S = BL.S,
      cap = Math.round(v.cap);
    if (cap >= 100 && cap !== S.cap0) BL.init(cap); // nuovo capitale: riparte da zero
    if (v.m != S.mode && BL_STRATEGIE[v.m]) {
      S.mode = v.m;
      BL.addLog(
        "info",
        "🔄 Strategia cambiata",
        `Nuova modalità: ${BL_STRATEGIE[v.m].name}`,
      );
    }
    if (!S.warm) {
      S.warm = 1;
      setTimeout(() => blLive() && BL.tick(), 2000); // prima decisione dopo 2 secondi
    }
    return BL.page();
  },
};
