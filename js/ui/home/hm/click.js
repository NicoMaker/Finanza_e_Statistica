hm.addEventListener("click", (e) => {
  const t = e.target.closest("[data-t]");
  if (t) {
    openT(t.dataset.t);
    return;
  }
});
