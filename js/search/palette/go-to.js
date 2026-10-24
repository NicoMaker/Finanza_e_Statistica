function goTo(o) {
  const set = o[3] || {},
    sw = atHome || o[0] !== cur;
  if (atHome) homeY = scrollY; // ricorda dove eri nella home
  atHome = false;
  cur = o[0];
  view();
  if (sw) build(1, set);
  else {
    ap(set);
    calc();
  }
  if (o[4]) {
    const e = document.getElementById("f_" + o[4]);
    if (e) {
      e.focus();
      if (e.select) e.select();
    }
  }
}
