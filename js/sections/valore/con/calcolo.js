// Calcolo dei risultati
T.con.c = function (v) {
  const i = v.d == "i" ? v.x / 100 : Math.exp(v.x / 100) - 1,
    dl = Math.log(1 + i);
  return (
    ks([
      K("Intensità δ = ln(1+i)", f4(dl * 100) + "%", 1),
      K("Tasso effettivo i = e^δ − 1", f4(i * 100) + "%"),
      K("Montante C·e^(δt)", f2(v.C * Math.exp(dl * v.t))),
      K("Valore attuale C·e^(−δt)", f2(v.C * Math.exp(-dl * v.t))),
    ]) + conCh(v.C, i, dl, v.t)
  );
};
