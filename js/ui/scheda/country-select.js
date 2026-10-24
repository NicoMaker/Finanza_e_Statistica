// Selettore nazione con bandiere nell'elenco e ricerca (per nome, sigla, valuta)
(function () {
  const nzs = (t) =>
    t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const items = (w) => [...w.querySelectorAll(".ctl li")];
  const hl = (w, i) => {
    const li = items(w).filter((x) => !x.hidden);
    li.forEach((x, j) => x.classList.toggle("on", j == i));
    w._i = i;
    if (li[i]) li[i].scrollIntoView({ block: "nearest" });
  };
  function fill(w, q) {
    const ul = w.querySelector(".ctl ul"),
      k = nzs(q || "")
        .split(/\s+/)
        .filter(Boolean);
    if (!ul.children.length)
      ul.innerHTML = CTY.map(
        (c) =>
          `<li role="option" data-v="${c[0]}" data-q="${nzs(c[1] + " " + c[0] + " " + c[2] + " " + curName(c[2]))}">${ctyFlag(c[0])}<b>${c[1]}</b><small>${c[2]} · ${curName(c[2])}</small></li>`,
      ).join("");
    items(w).forEach(
      (li) => (li.hidden = !k.every((x) => li.dataset.q.includes(x))),
    );
    w.querySelector(".ctn").hidden = items(w).some((li) => !li.hidden);
    hl(w, 0);
  }
  const open = (w) => {
    w.querySelector(".ctl").hidden = false;
    const s = w.querySelector(".cts");
    s.value = "";
    fill(w, "");
    s.focus();
  };
  const close = (w) => (w.querySelector(".ctl").hidden = true);
  function pick(w, v) {
    const sel = w.querySelector("select");
    close(w);
    if (sel.value != v) {
      sel.value = v;
      sel.dispatchEvent(new Event("change", { bubbles: true }));
    }
    w.querySelector(".ctb").focus();
  }
  form.addEventListener("click", (e) => {
    const w = e.target.closest(".cty");
    document
      .querySelectorAll(".cty .ctl:not([hidden])")
      .forEach((l) => l.parentNode != w && close(l.parentNode));
    if (!w) return;
    if (e.target.closest(".ctb"))
      return w.querySelector(".ctl").hidden ? open(w) : close(w);
    const li = e.target.closest(".ctl li");
    if (li) pick(w, li.dataset.v);
  });
  form.addEventListener(
    "input",
    (e) =>
      e.target.classList.contains("cts") &&
      fill(e.target.closest(".cty"), e.target.value),
  );
  // in cattura: i tasti nella ricerca non devono arrivare al resto del form
  form.addEventListener(
    "keydown",
    (e) => {
      if (!e.target.classList || !e.target.classList.contains("cts")) return;
      const w = e.target.closest(".cty"),
        vis = items(w).filter((x) => !x.hidden);
      e.stopPropagation();
      if (e.key == "ArrowDown" || e.key == "ArrowUp") {
        e.preventDefault();
        hl(
          w,
          Math.max(
            0,
            Math.min(
              vis.length - 1,
              (w._i || 0) + (e.key == "ArrowDown" ? 1 : -1),
            ),
          ),
        );
      } else if (e.key == "Enter") {
        e.preventDefault();
        if (vis[w._i || 0]) pick(w, vis[w._i || 0].dataset.v);
      } else if (e.key == "Escape") {
        close(w);
        w.querySelector(".ctb").focus();
      }
    },
    true,
  );
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".cty"))
      document
        .querySelectorAll(".cty .ctl:not([hidden])")
        .forEach((l) => close(l.parentNode));
  });
})();
