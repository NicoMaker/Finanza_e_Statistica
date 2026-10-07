// Home: griglia delle schede per sezione, apertura singola scheda, ritorno alla home
hm.innerHTML =
  `<h2 class="ht">Dove vuoi andare?</h2><p class="hs">Le schede sono divise per sezione: scegli una scheda per aprirla, poi usa «Home» per tornare qui.</p>` +
  GR.map(
    (g, k) =>
      `<section class="hsec" style="--c:${g.c}"><div class="hh" style="--c:${g.c}"><span class="gi">${g.i}</span><span>${g.n}</span><small class="hp">${g.t.length} ${g.t.length == 1 ? "scheda" : "schede"}</small></div><div class="hg">${g.t.map((x, j) => `<button class="hc sm" data-t="${x}" style="--c:${TH[x][1]};--d:${(k * 3 + j) * 35}ms"><span class="hi">${TH[x][0]}</span><b>${T[x].n}</b><span class="hl">${TH[x][2]}</span></button>`).join("")}</div></section>`,
  ).join("");

// Aggiorna l'altezza reale dell'header sticky in una variabile CSS
function updateHeaderHeight() {
  const h = document.getElementById("stk");
  if (!h) return;
  // offsetHeight include padding + border, ma esclude i margini
  // Aggiungiamo il padding-top dell'header (safe-area) e togliamo il margin-top negativo
  const rect = h.getBoundingClientRect();
  document.documentElement.style.setProperty("--h-hdr", rect.height + "px");
}
addEventListener("resize", updateHeaderHeight);
addEventListener("load", updateHeaderHeight);
if (window.ResizeObserver) {
  const _hd = document.getElementById("stk");
  if (_hd) new ResizeObserver(updateHeaderHeight).observe(_hd);
}

function view() {
  theme();
  // Aggiunge/rimuove la classe .home sul body per attivare lo sticky
  document.body.classList.toggle("home", atHome);
  hm.style.display = atHome ? "" : "none";
  navw.style.display = atHome ? "none" : "";
  main.style.display = atHome ? "none" : "";
  hn.innerHTML = atHome
    ? "<kbd>←</kbd><kbd>→</kbd><kbd>↑</kbd><kbd>↓</kbd> muoviti · <kbd>Invio</kbd> apri · <kbd>/</kbd> o <kbd>Ctrl</kbd>+<kbd>K</kbd> cerca"
    : `<kbd>/</kbd> o <kbd>Ctrl</kbd>+<kbd>K</kbd> cerca · <kbd>↑</kbd><kbd>↓</kbd> nei campi cambiano il valore · <kbd>Invio</kbd> campo successivo · <kbd>Esc</kbd> esci dal campo, poi torna alla home`;
  // Aggiorna l'altezza dopo il rendering
  requestAnimationFrame(updateHeaderHeight);
}

function openT(x) {
  atHome = false;
  cur = x;
  view();
  build(1);
  scrollTo({ top: 0 });
  try {
    history.pushState({ in: 1 }, "");
  } catch (e) {}
}

function toHome() {
  atHome = true;
  view();
  const c = hm.querySelector('[data-t="' + cur + '"]');
  scrollTo({ top: 0 });
  if (c) c.focus({ preventScroll: true });
}

hm.addEventListener("click", (e) => {
  const t = e.target.closest("[data-t]");
  if (t) {
    openT(t.dataset.t);
    return;
  }
});

bk.onclick = () => {
  if (history.state && history.state.in) {
    try {
      history.back();
      setTimeout(() => {
        if (!atHome) toHome();
      }, 200);
      return;
    } catch (e) {}
  }
  toHome();
};

addEventListener("popstate", () => {
  if (!atHome) toHome();
});

document.querySelector(".logo").onclick = () => {
  if (!atHome) bk.onclick();
};

document.addEventListener("keydown", (e) => {
  if (!atHome || !pal.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
  const m = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
  if (!m) return;
  const cs = [...hm.querySelectorAll(".hc")],
    i = cs.indexOf(document.activeElement);
  e.preventDefault();
  cs[
    i < 0 ? (m > 0 ? 0 : cs.length - 1) : (i + m + cs.length) % cs.length
  ].focus();
});
