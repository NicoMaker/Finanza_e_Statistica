pl.addEventListener("click", (e) => {
  const i = e.target.closest(".pi");
  if (i) {
    const o = RS[+i.dataset.i];
    closeP();
    goTo(o);
  }
});
