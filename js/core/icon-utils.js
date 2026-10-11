// Icona di un'opzione dei segmented control (i dati stanno in data/icone-form.json e data/bandiere-svg.json)
function ic(t, f, v, j) {
  if (t == "amm" && f == "t" && FLG[v]) return FLG[v];
  const m = ICO[t + "." + f],
    e = Array.isArray(m) ? m[j] : m && m[v];
  return `<span class="ic">${e || "◆"}</span>`;
}
