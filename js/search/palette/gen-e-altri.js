// Ricerca (Ctrl+K): indice, risultati, apertura della scheda trovata
const GEN = Object.keys(T).flatMap((k) =>
    T[k].f.flatMap((x) =>
      x.t == "s"
        ? x.o.map((o) => [
            k,
            o[1],
            "Imposta «" + x.l + "»",
            { [x.k]: o[0] },
            x.k,
          ])
        : [[k, x.l, "Vai al campo", {}, x.k]],
    ),
  ),
  ALL = Object.keys(T)
    .map((k) => [k, T[k].n, "Apri la sezione", {}])
    .concat(OPT)
    .concat(GEN),
  nz = (t) =>
    t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
