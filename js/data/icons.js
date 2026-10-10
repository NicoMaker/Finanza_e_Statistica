// Bandiere SVG e icone dei segmented control nei form
const FLG = {
  fr: '<svg class="fl" viewBox="0 0 3 2" preserveAspectRatio="none"><rect width="1" height="2" fill="#0055A4"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#EF4135"/></svg>',
  it: '<svg class="fl" viewBox="0 0 3 2" preserveAspectRatio="none"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#CE2B37"/></svg>',
  de: '<svg class="fl" viewBox="0 0 3 2" preserveAspectRatio="none"><rect width="3" height="2" fill="#000"/><rect y=".667" width="3" height="1.333" fill="#DD0000"/><rect y="1.333" width="3" height=".667" fill="#FFCE00"/></svg>',
  am:
    '<svg class="fl" viewBox="0 0 19 10" preserveAspectRatio="none"><rect width="19" height="10" fill="#fff"/>' +
    [0, 2, 4, 6, 8, 10, 12]
      .map(
        (k) =>
          `<rect y="${(k * 10) / 13}" width="19" height="${10 / 13}" fill="#B22234"/>`,
      )
      .join("") +
    '<rect width="7.6" height="5.385" fill="#3C3B6E"/></svg>',
};
const ICO = {
  "amm.m": ["📅", "🗓️", "🧾", "🔄"],
  "amm.ric": { n: "🚫", s: "🏦" },
  "pre.nu": ["🗓️", "📅"],
  "val.m": { s: "💶", c: "🔁", v: "📈" },
  "val.p": { p: "⏭️", a: "⏮️" },
  "con.d": { i: "％", d: "δ" },
  "dur.au": ["📅", "🗓️", "📆", "⏱️"],
  "dur.pu": ["🔢", "🗓️", "📆", "⏱️", "🎆"],
  "vc.k": { c: "🧪", p: "🌍" },
  "tas.d": { i: "📊", j: "🔄", d: "🏷️" },
  "obb.m": { p: "💶", y: "🎯" },
  "pac.m": { m: "💰", r: "🎯", t: "⏱️" },
  "pac.f": ["📅", "🗓️", "🧾", "🔄"],
  "pac.p": { p: "⏭️", a: "⏮️" },
  "ren.m": { p: "♾️", c: "📈", d: "⏳", a: "📶", g: "🚀" },
  "bl.m": { balanced: "⚖️", aggressive: "🚀", conservative: "🛡️" },
  "rnd.fr": ["⏱️", "📆", "🗓️", "🧾", "🎆"],
  "rnd.z": ["🛡️", "🔒"],
};
function ic(t, f, v, j) {
  if (t == "amm" && f == "t" && FLG[v]) return FLG[v];
  const m = ICO[t + "." + f],
    e = Array.isArray(m) ? m[j] : m && m[v];
  return `<span class="ic">${e || "◆"}</span>`;
}
