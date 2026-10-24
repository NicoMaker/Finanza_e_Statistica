function applyTheme(dark, persist) {
  const r = document.documentElement;
  const next = dark ? "dark" : "light";
  r.dataset.theme = next;
  if (persist) {
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", dark ? "#0a1020" : "#0f1f4d");
  if (typeof theme === "function") theme();
}
