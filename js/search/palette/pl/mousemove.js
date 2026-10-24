pl.addEventListener("mousemove", (e) => {
  const i = e.target.closest(".pi");
  if (i && +i.dataset.i !== sel) {
    sel = +i.dataset.i;
    pl.querySelectorAll(".pi").forEach((x, j) =>
      x.classList.toggle("on", j == sel),
    );
  }
});
