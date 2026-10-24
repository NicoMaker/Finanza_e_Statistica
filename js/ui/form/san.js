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
