// Home: griglia delle schede per sezione, apertura singola scheda, ritorno alla home
hm.innerHTML =
  `<h2 class="ht">Dove vuoi andare?</h2><p class="hs">Le schede sono divise per sezione: scegli una scheda per aprirla, poi usa «Home» per tornare qui.</p>` +
  GR.map(
    (g, k) =>
      `<section class="hsec" style="--c:${g.c}"><div class="hh" style="--c:${g.c}"><span class="gi">${g.i}</span><span>${g.n}</span><small class="hp">${g.t.length} ${g.t.length == 1 ? "scheda" : "schede"}</small></div><div class="hg">${g.t.map((x, j) => `<button class="hc sm" data-t="${x}" style="--c:${TH[x][1]};--d:${(k * 3 + j) * 35}ms"><span class="hi">${TH[x][0]}</span><b>${T[x].n}</b><span class="hl">${TH[x][2]}</span></button>`).join("")}</div></section>`,
  ).join("");
