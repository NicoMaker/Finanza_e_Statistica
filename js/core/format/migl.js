// Numeri nei campi: il punto separa le migliaia (1.000) e la virgola i decimali (1.234,5).
// Un punto non seguito da esattamente 3 cifre (es. 0.5) resta un decimale, come prima.
const MIGL = /^[+-]?[1-9]\d{0,2}(\.\d{3})+(,\d*)?$/;
