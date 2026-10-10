// Home: griglia delle schede per sezione, apertura singola scheda, ritorno alla home
hm.innerHTML =
  `<h2 class="ht">Dove vuoi andare?</h2><p class="hs">Le schede sono divise per sezione: scegli una scheda per aprirla, poi usa «Home» per tornare qui.</p>` +
  GR.map(
    (g, k) =>
      `<section class="hsec" style="--c:${g.c}"><div class="hh" style="--c:${g.c}"><span class="gi">${g.i}</span><span>${g.n}</span><small class="hp">${g.t.length} ${g.t.length == 1 ? "scheda" : "schede"}</small></div><div class="hg">${g.t.map((x, j) => `<button class="hc sm" data-t="${x}" style="--c:${TH[x][1]};--d:${(k * 3 + j) * 35}ms"><span class="hi">${TH[x][0]}</span><b>${T[x].n}</b><span class="hl">${TH[x][2]}</span></button>`).join("")}</div></section>`,
  ).join("");

// Lo scroll lo gestiamo noi (homeY): senza questo il browser, tornando indietro
// nella cronologia, rimette la pagina in cima e annulla la posizione salvata
try {
  history.scrollRestoration = "manual";
} catch (e) {}

// Aggiorna l'altezza reale dell'header sticky in una variabile CSS
function updateHeaderHeight() {
  const h = document.getElementById("stk");
  if (!h) return;
  // offsetHeight include padding + border, ma esclude i margini
  // Aggiungiamo il padding-top dell'header (safe-area) e togliamo il margin-top negativo
  const rect = h.getBoundingClientRect();
  document.documentElement.style.setProperty("--h-hdr", rect.height + "px");
  // altezza della barra scheda (serve a tenere ferma la scheda di configurazione su PC)
  const n = document.getElementById("navw");
  document.documentElement.style.setProperty(
    "--h-nav",
    (n && n.offsetHeight ? n.offsetHeight + 4 : 0) + "px",
  );
}
addEventListener("resize", updateHeaderHeight);
addEventListener("load", updateHeaderHeight);
if (window.ResizeObserver) {
  const _hd = document.getElementById("stk");
  if (_hd) new ResizeObserver(updateHeaderHeight).observe(_hd);
  const _nv = document.getElementById("navw");
  if (_nv) new ResizeObserver(updateHeaderHeight).observe(_nv);
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
  if (atHome) homeY = scrollY; // ricorda dove eri nella home
  atHome = false;
  cur = x;
  view();
  build(1);
  scrollTo({ top: 0 });
  try {
    history.pushState({ in: 1 }, "");
  } catch (e) {}
}

// toHome(): torna alla home nel punto da cui eri entrato.
// toHome(true): torna all'inizio della home (solo dal logo).
function toHome(top) {
  atHome = true;
  view();
  const c = hm.querySelector('[data-t="' + cur + '"]');
  if (c) c.focus({ preventScroll: true });
  scrollTo({ top: top ? 0 : homeY, behavior: "instant" });
  if (top) homeY = 0;
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

// Il logo è l'unico modo per tornare all'inizio della home, da qualsiasi punto
const logoEl = document.querySelector(".logo");
logoEl.style.cursor = "pointer";
logoEl.onclick = () => {
  if (atHome) {
    scrollTo({ top: 0, behavior: "smooth" });
    homeY = 0;
    return;
  }
  toHome(true);
  // Se la scheda era stata aperta con pushState, rimuove quella voce di cronologia
  // (atHome è già true, quindi il popstate non fa nulla)
  if (history.state && history.state.in) {
    try {
      history.back();
    } catch (e) {}
  }
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
