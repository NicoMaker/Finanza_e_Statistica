// Ricerca (Ctrl+K): indice, risultati, apertura della scheda trovata
const GEN = Object.keys(T).flatMap((k) =>
    T[k].f.flatMap((x) =>
      x.t == "s"
        ? x.o.map((o) => [
            k,
            o[1],
            "Imposta «" + x.l + "»",
            { [x.k]: o[0] },
            x.k,
          ])
        : [[k, x.l, "Vai al campo", {}, x.k]],
    ),
  ),
  ALL = Object.keys(T)
    .map((k) => [k, T[k].n, "Apri la sezione", {}])
    .concat(OPT)
    .concat(GEN),
  nz = (t) =>
    t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
let RS = [],
  sel = 0;
const srch = (q) => {
  const w = nz(q).split(/\s+/).filter(Boolean);
  return ALL.map((o) => {
    const h = nz(o[1] + " " + o[2] + " " + T[o[0]].n);
    let sc = 0;
    for (const x of w) {
      const j = h.indexOf(x);
      if (j < 0) return null;
      sc += j;
    }
    return [sc, o];
  })
    .filter(Boolean)
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1])
    .slice(0, 40);
};
function rp() {
  pl.innerHTML = RS.length
    ? RS.map(
        (o, i) =>
          `<div class="pi${i == sel ? " on" : ""}" data-i="${i}" role="option"><span class="pg" style="background:${TH[o[0]][1]};font-style:normal">${TH[o[0]][0]}</span><div><b>${o[1]}</b><small>${o[2]} · ${T[o[0]].n}</small></div><kbd>↵</kbd></div>`,
      ).join("")
    : '<div class="pe">Nessun risultato</div>';
  const e = pl.querySelector(".on");
  if (e) e.scrollIntoView({ block: "nearest" });
}
const sr = () => {
    RS = srch(pq.value);
    sel = 0;
    rp();
  },
  openP = () => {
    pal.hidden = false;
    pq.value = "";
    sr();
    pq.focus();
  },
  closeP = () => {
    pal.hidden = true;
  };
function goTo(o) {
  const set = o[3] || {},
    sw = atHome || o[0] !== cur;
  if (atHome) homeY = scrollY; // ricorda dove eri nella home
  atHome = false;
  cur = o[0];
  view();
  if (sw) build(1, set);
  else {
    ap(set);
    calc();
  }
  if (o[4]) {
    const e = document.getElementById("f_" + o[4]);
    if (e) {
      e.focus();
      if (e.select) e.select();
    }
  }
}
sb.onclick = openP;
pq.oninput = sr;
pal.addEventListener("mousedown", (e) => {
  if (e.target === pal) closeP();
});
pl.addEventListener("click", (e) => {
  const i = e.target.closest(".pi");
  if (i) {
    const o = RS[+i.dataset.i];
    closeP();
    goTo(o);
  }
});
pl.addEventListener("mousemove", (e) => {
  const i = e.target.closest(".pi");
  if (i && +i.dataset.i !== sel) {
    sel = +i.dataset.i;
    pl.querySelectorAll(".pi").forEach((x, j) =>
      x.classList.toggle("on", j == sel),
    );
  }
});
pq.addEventListener("keydown", (e) => {
  if (e.key == "ArrowDown" || e.key == "ArrowUp") {
    e.preventDefault();
    if (RS.length) {
      sel = (sel + (e.key == "ArrowDown" ? 1 : -1) + RS.length) % RS.length;
      rp();
    }
  } else if (e.key == "Enter") {
    e.preventDefault();
    const o = RS[sel];
    if (o) {
      closeP();
      goTo(o);
    }
  } else if (e.key == "Escape") closeP();
});
