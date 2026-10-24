// Numero "così com'è" (interi e decimali brevi) con il punto sulle migliaia: periodi, rate, quantità
const fg = (n) => (isFinite(n) ? nf(n, { maximumFractionDigits: 6 }) : "—");
