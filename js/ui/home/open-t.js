function openT(x) {
  if (atHome) homeY = scrollY; // ricorda dove eri nella home
  atHome = false;
  cur = x;
  view();
  build(1);
  scrollTo({ top: 0 });
  try {
    history.pushState({ in: 1 }, "");
  } catch (e) {}
}
