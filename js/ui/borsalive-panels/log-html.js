BL.logHtml = () => {
  const ic = { buy: "🟢", sell: "🔴", info: "ℹ️", hold: "⏸️" };
  return BL.S.log
    .map(
      (e) =>
        `<div class="bl-le"><div class="bl-li ${e.type}">${ic[e.type]}</div><div class="bl-lc"><b>${e.title}</b><p>${e.reason}</p><small>${BLF.ora(e.time)}</small></div></div>`,
    )
    .join("");
};
