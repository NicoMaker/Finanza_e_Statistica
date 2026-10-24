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
