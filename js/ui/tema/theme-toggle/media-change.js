// Se l'utente non ha mai scelto manualmente, segui i cambi del sistema
media.addEventListener("change", (e) => {
  let saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (err) {}
  if (!saved) applyTheme(e.matches, false);
});
