/* ---------- Dadi ---------- */
// Quante combinazioni (ordinate) danno ciascuna somma con nd dadi da `fac` facce. Indice = somma.
function dadiWays(nd, fac) {
  let w = [1n]; // zero dadi: somma 0 in un solo modo
  for (let d = 1; d <= nd; d++) {
    const nx = Array(d * fac + 1).fill(0n);
    for (let s = 0; s < w.length; s++) {
      if (!w[s]) continue;
      for (let f = 1; f <= fac; f++) nx[s + f] += w[s];
    }
    w = nx;
  }
  return w;
}
