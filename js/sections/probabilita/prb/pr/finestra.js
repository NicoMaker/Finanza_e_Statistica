// Se la distribuzione ha troppi valori, mostra solo la zona dove la probabilità non è trascurabile
function prFinestra(xs, ps) {
  if (xs.length <= 120) return { xs, ps, tagliato: false };
  const mx = Math.max(...ps);
  let a = ps.findIndex((p) => p > mx * 1e-6),
    b = ps.length - 1 - [...ps].reverse().findIndex((p) => p > mx * 1e-6);
  if (b - a > 400) {
    const m = ps.indexOf(mx);
    a = Math.max(0, m - 200);
    b = Math.min(ps.length - 1, m + 200);
  }
  return { xs: xs.slice(a, b + 1), ps: ps.slice(a, b + 1), tagliato: true };
}
