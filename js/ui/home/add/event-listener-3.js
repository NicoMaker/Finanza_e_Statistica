addEventListener("popstate", () => {
  if (!atHome) toHome();
});
