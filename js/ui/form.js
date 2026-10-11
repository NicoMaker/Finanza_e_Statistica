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
    v[x.k] = t == "n" ? pn(e.value) : e.value;
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
  form.querySelectorAll(".cty").forEach((w) => {
    const c = ctyOf(w.querySelector("select").value);
    w.querySelector(".ctb img").src =
      "https://flagcdn.com/w40/" + c[0] + ".png";
    w.querySelector(".ctb span").textContent = c[1] + " · " + c[2];
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
  if (t.hasAttribute("data-txt")) return;
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
// Mentre si scrive i numeri prendono subito punti e virgola (10000 → 10.000), con il cursore al suo posto
const liveFmt = (e) => {
  const t = e.target;
  if (
    (t.tagName != "INPUT" && t.tagName != "TEXTAREA") ||
    t.hasAttribute("data-txt")
  )
    return;
  const o = t.value,
    n = fl(o);
  if (n === o) return;
  const p = t.selectionStart,
    k = o.slice(0, p).replace(/[^\d,+-]/g, "").length;
  t.value = n;
  let i = 0,
    c = 0;
  while (i < n.length && c < k) if (/[\d,+-]/.test(n[i++])) c++;
  try {
    t.setSelectionRange(i, i);
  } catch (x) {}
};
form.addEventListener("input", (e) => {
  san(e);
  liveFmt(e);
  calc();
});
// Uscendo dal campo i numeri vengono riscritti con le migliaia (10000 → 10.000)
const fmtField = (t) => {
  if (
    (t.tagName == "INPUT" || t.tagName == "TEXTAREA") &&
    !t.hasAttribute("data-txt")
  )
    t.value = fv(t.value);
};
form.addEventListener("change", (e) => {
  san(e);
  fmtField(e.target);
  calc();
});
const ap = (o) =>
  Object.entries(o).forEach(([k, v]) => {
    const e = document.getElementById("f_" + k);
    if (e) e.value = e.tagName == "SELECT" || e.hasAttribute("data-txt") ? v : fv(v);
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
    !t.hasAttribute("data-txt") &&
    !e.ctrlKey &&
    !e.metaKey
  ) {
    e.preventDefault();
    const n = pn(t.value) || 0;
    t.value = fv(
      +(
        n +
        (e.shiftKey ? 10 : e.altKey ? 0.1 : 1) * (e.key == "ArrowUp" ? 1 : -1)
      ).toFixed(6),
    );
    calc();
  }
});
