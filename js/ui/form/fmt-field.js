// Uscendo dal campo i numeri vengono riscritti con le migliaia (10000 → 10.000)
const fmtField = (t) => {
  if (
    (t.tagName == "INPUT" || t.tagName == "TEXTAREA") &&
    !t.hasAttribute("data-txt")
  )
    t.value = fv(t.value);
};
