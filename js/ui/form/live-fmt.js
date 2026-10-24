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
