/* ---------- Etichette degli elementi ---------- */
// Elementi A, B, C… (fino a 26) oppure 1, 2, 3…
function etichette(n, tipo) {
  const L = [];
  for (let i = 0; i < n; i++)
    L.push(
      tipo === "n" || n > 26 ? String(i + 1) : String.fromCharCode(65 + i),
    );
  return L;
}
