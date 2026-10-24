// Tutte le cifre, a gruppi di tre, anche per numeri molto grandi
const bFull = (b) => b.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
