// Borsa Live · formattazione di importi e variazioni (usa f2 di format.js)
const BLF = {
  eu: (n) => "€" + n.toLocaleString("it-IT", { maximumFractionDigits: 0 }),
  usd: (n) => "$" + f2(n),
  sg: (n) => (n >= 0 ? "+" : ""),
  ora: (d) => d.toLocaleTimeString("it-IT"),
};
