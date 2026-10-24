function remote(url, ms = 0) {
  if (RC[url]) return RC[url];
  clearTimeout(rtm);
  rtm = setTimeout(() => {
    RC[url] = { st: "load" };
    fetch(url)
      .then((r) => r.json())
      .then((d) => (RC[url] = { st: "ok", d }))
      .catch(() => (RC[url] = { st: "err" }))
      .finally(() => !atHome && calc());
  }, ms);
  return { st: "load" };
}
