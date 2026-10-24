// Scorciatoie globali: Ctrl+K / "/" per cercare, Esc per tornare alla home
document.addEventListener("keydown", (e) => {
  const ty =
    /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) ||
    !!(e.target.classList && e.target.classList.contains("sg"));
  if (
    ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() == "k") ||
    (!ty && e.key == "/")
  ) {
    e.preventDefault();
    openP();
    return;
  }
  if (e.key == "Escape" && !atHome && pal.hidden && !ty) {
    toHome();
    return;
  }
});
