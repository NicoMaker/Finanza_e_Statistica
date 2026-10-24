form.addEventListener("click", (e) => {
  const b = e.target.closest && e.target.closest(".sg");
  if (!b) return;
  const sel = document.getElementById(b.parentNode.dataset.s);
  if (sel.value != b.dataset.v) {
    sel.value = b.dataset.v;
    sel.dispatchEvent(new Event("change", { bubbles: true }));
  }
});
