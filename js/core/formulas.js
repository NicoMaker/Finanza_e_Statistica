// Helper per scrivere le formule (frazioni, equazioni) e contenitore FM
const fr = (a, b) =>
  `<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const eq = (...a) => a.map((x) => `<div class="eq">${x}</div>`).join("");
const FM = {};
