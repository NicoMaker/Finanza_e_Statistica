BL.stratHtml = () => {
  const m = BL_STRATEGIE[BL.S.mode];
  return `<div class="bl-strat"><div class="bl-sn">${m.name}</div><p>${m.desc}</p><div class="bl-tags">${m.tags.map((t) => `<span class="bl-tag ${t.c || ""}">${t.t}</span>`).join("")}</div></div>`;
};
