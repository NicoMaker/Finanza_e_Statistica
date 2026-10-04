// Tooltip dei grafici
const tip = document.createElement("div");
tip.id = "tip";
document.body.appendChild(tip);
["pointermove", "pointerdown"].forEach((ev) =>
  document.addEventListener(ev, (e) => {
    const t = e.target.closest && e.target.closest("[data-tip]");
    if (!t) {
      tip.style.opacity = 0;
      return;
    }
    tip.innerHTML = t.dataset.tip;
    tip.style.opacity = 1;
    const w = tip.offsetWidth;
    tip.style.left =
      Math.max(8, Math.min(innerWidth - w - 8, e.clientX + 14)) + "px";
    tip.style.top = e.clientY + 16 + "px";
  }),
);
