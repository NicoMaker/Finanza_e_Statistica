// Numero di Bell B(n): tutte le partizioni di un insieme di n elementi
const bBell = (n) => _stRiga(n).reduce((a, b) => a + b, 0n);
