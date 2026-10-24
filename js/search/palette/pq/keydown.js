pq.addEventListener("keydown", (e) => {
  if (e.key == "ArrowDown" || e.key == "ArrowUp") {
    e.preventDefault();
    if (RS.length) {
      sel = (sel + (e.key == "ArrowDown" ? 1 : -1) + RS.length) % RS.length;
      rp();
    }
  } else if (e.key == "Enter") {
    e.preventDefault();
    const o = RS[sel];
    if (o) {
      closeP();
      goTo(o);
    }
  } else if (e.key == "Escape") closeP();
});
