// Formattatori numerici e piccoli helper HTML per i risultati
// Separatore delle migliaia sempre attivo (1.000 · 1.000.000): "it-IT" da solo lo omette sui numeri
// a 4 cifre (1000), mentre "de-DE" ha gli stessi separatori (punto migliaia, virgola decimali) ma
// raggruppa già da 1.000.
const nf = (n, o) => (+n).toLocaleString("de-DE", o);
