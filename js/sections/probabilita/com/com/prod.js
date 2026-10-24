// Espressione «n · (n−1) · … » con i primi e l'ultimo termine
const comProd = (da, q) => {
  if (q <= 0) return "1";
  const t = Array.from({ length: q }, (_, i) => da - i);
  return q <= 6
    ? t.join(" · ")
    : t.slice(0, 3).join(" · ") + " · … · " + t[q - 1];
};
