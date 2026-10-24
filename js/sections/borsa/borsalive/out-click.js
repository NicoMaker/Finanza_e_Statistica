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
