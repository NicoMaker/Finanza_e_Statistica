// Pulsante tema chiaro/scuro + memoria (localStorage) + sync col sistema
const media = matchMedia("(prefers-color-scheme:dark)");

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

tg.onclick = () => {
  applyTheme(!isDark(), true);
};

// Se l'utente non ha mai scelto manualmente, segui i cambi del sistema
media.addEventListener("change", (e) => {
  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (err) {}
  if (!saved) applyTheme(e.matches, false);
});

// Allinea subito meta e logo allo stato corrente
applyTheme(isDark(), false);
