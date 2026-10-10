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
// Alpha Vantage: URL e messaggio d'errore
const AV_KEY = "V4B00MZ675MCO7ZQ";
const avUrl = (fn, sym, key, x = "") =>
  `https://www.alphavantage.co/query?function=${fn}&symbol=${encodeURIComponent(String(sym).trim().toUpperCase())}${x}&apikey=${String(key).trim()}`;
const avErr = (d) => d && (d.Note || d.Information || d["Error Message"]);
// Serie [data, open, high, low, close, volume] in ordine cronologico
const avSeries = (o) =>
  Object.keys(o)
    .sort()
    .map((k) => [k, +o[k]["1. open"], +o[k]["2. high"], +o[k]["3. low"], +o[k]["4. close"], +o[k]["5. volume"]]);
