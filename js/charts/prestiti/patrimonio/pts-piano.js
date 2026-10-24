// Situazione patrimoniale di un finanziamento: attivo (bene), passivo (debito) e patrimonio netto
// P = punti del piano: { n: rate pagate, tau: periodi trascorsi, debt: debito, paid: totale versato, int: interessi cumulati }

// Punti patrimoniali da un piano standard R = [k, importo, quota capitale, quota interessi, debito residuo]
function ptsPiano(R, C, t0) {
  const P = [{ n: 0, tau: 0, debt: C, paid: 0, int: 0 }];
  let paid = 0,
    int = 0;
  R.forEach((r, j) => {
    paid += r[1];
    int += r[3];
    P.push({ n: j + 1, tau: t0 ? j + 1 : j, debt: r[4], paid, int });
  });
  return P;
}
