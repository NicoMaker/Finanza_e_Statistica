// Form dei campi: calcolo, sanificazione input, segmented control, tastiera nei campi
// Etichetta ogni cella con il nome della colonna (serve alla vista a schede su mobile)
function lt(r) {
  r.querySelectorAll("table").forEach((t) => {
    const rw = [...t.rows],
      h = [...rw[0].cells].map((c) => c.textContent);
    rw[0].classList.add("hd");
    rw.slice(1).forEach((q) =>
      [...q.cells].forEach((c, i) => (c.dataset.l = h[i] || "")),
    );
  });
}
function calc() {
  const d = T[cur],
    v = {};
  d.f.forEach((x) => {
    const e = document.getElementById("f_" + x.k),
      t = x.t || "n";
    v[x.k] = t == "n" ? parseFloat(e.value.replace(",", ".")) : e.value;
    if (t == "n" && isNaN(v[x.k])) v[x.k] = 0;
  });
  d.f.forEach((x) => {
    document.querySelector(`[data-f="${x.k}"]`).style.display =
      !x.s || x.s(v) ? "" : "none";
  });
  form.querySelectorAll(".seg").forEach((g) => {
    const sv = document.getElementById(g.dataset.s).value;
    g.querySelectorAll(".sg").forEach((b) =>
      b.classList.toggle("on", b.dataset.v == sv),
    );
  });
  try {
    out.innerHTML = d.c(v);
    lt(out);
  } catch (e) {
    out.innerHTML = '<p class="err">Controlla i dati inseriti.</p>';
  }
}
function san(e) {
  const t = e.target;
  if (t.tagName != "INPUT" && t.tagName != "TEXTAREA") return;
  const re = t.tagName == "INPUT" ? /[^0-9.,+\-]/g : /[^0-9.,;+\-\s]/g,
    o = t.value,
    n = o.replace(re, "");
  if (n !== o) {
    const p = t.selectionStart - (o.length - n.length);
    t.value = n;
    try {
      t.setSelectionRange(Math.max(0, p), Math.max(0, p));
    } catch (x) {}
  }
}
form.addEventListener("input", (e) => {
  san(e);
  calc();
});
form.addEventListener("change", (e) => {
  san(e);
  calc();
});
const ap = (o) =>
  Object.entries(o).forEach(([k, v]) => {
    const e = document.getElementById("f_" + k);
    if (e) e.value = v;
  });
form.addEventListener("click", (e) => {
  const b = e.target.closest && e.target.closest(".sg");
  if (!b) return;
  const sel = document.getElementById(b.parentNode.dataset.s);
  if (sel.value != b.dataset.v) {
    sel.value = b.dataset.v;
    sel.dispatchEvent(new Event("change", { bubbles: true }));
  }
});
form.addEventListener("keydown", (e) => {
  const t = e.target;
  if (e.key == "Escape") {
    t.blur();
    return;
  }
  if (
    t.classList &&
    t.classList.contains("sg") &&
    /^Arrow(Left|Right|Up|Down)$/.test(e.key)
  ) {
    e.preventDefault();
    const bs = [...t.parentNode.children],
      n =
        bs[
          (bs.indexOf(t) + (/Left|Up/.test(e.key) ? -1 : 1) + bs.length) %
            bs.length
        ];
    n.click();
    n.focus();
    return;
  }
  if (
    e.key == "Enter" &&
    (t.tagName == "INPUT" ||
      t.tagName == "SELECT" ||
      (t.classList && t.classList.contains("sg")))
  ) {
    e.preventDefault();
    const f = [...form.querySelectorAll("input,textarea,.sg.on")].filter(
        (x) => x.offsetParent,
      ),
      n = f[f.indexOf(t) + 1] || f[0];
    n.focus();
    if (n.select) n.select();
  }
  if (
    (e.key == "ArrowUp" || e.key == "ArrowDown") &&
    t.tagName == "INPUT" &&
    !e.ctrlKey &&
    !e.metaKey
  ) {
    e.preventDefault();
    const n = parseFloat(t.value.replace(",", ".")) || 0;
    t.value = +(
      n +
      (e.shiftKey ? 10 : e.altKey ? 0.1 : 1) * (e.key == "ArrowUp" ? 1 : -1)
    ).toFixed(6);
    calc();
  }
});
