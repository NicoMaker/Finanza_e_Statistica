// Form dei campi: calcolo, sanificazione input, segmented control, tastiera nei campi
// Etichetta ogni cella con il nome della colonna (serve alla vista a schede su mobile)
function lt(r) {
  r.querySelectorAll("table").forEach((t) => {
    const rw = [...t.rows],
      h = [...rw[0].cells].map((c) => c.textContent);
    rw[0].classList.add("hd");
    rw.slice(1).forEach((q) =>
      [...q.cells].forEach((c, i) => (c.dataset.l = h[i] || "")),
    );
  });
}
