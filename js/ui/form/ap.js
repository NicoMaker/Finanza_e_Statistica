const ap = (o) =>
  Object.entries(o).forEach(([k, v]) => {
    const e = document.getElementById("f_" + k);
    if (e)
      e.value = e.tagName == "SELECT" || e.hasAttribute("data-txt") ? v : fv(v);
  });
