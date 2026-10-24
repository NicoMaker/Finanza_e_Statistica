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
