// Prodotto di una lista di BigInt (principio moltiplicativo)
const bProd = (a) => a.reduce((r, x) => r * BigInt(x), 1n);
