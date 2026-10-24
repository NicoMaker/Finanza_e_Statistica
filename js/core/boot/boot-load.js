function bootLoad(src) {
  return new Promise((ok, ko) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = ok;
    s.onerror = () => ko(new Error("Script non caricato: " + src));
    document.body.appendChild(s);
  });
}
