// Dati remoti: cache per URL e ricalcolo della scheda a download finito.
// Con ms > 0 il download parte solo quando l'utente smette di digitare.
const RC = {};
let rtm;
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
