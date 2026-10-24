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
