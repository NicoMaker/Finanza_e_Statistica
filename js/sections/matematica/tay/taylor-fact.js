// Sezione «Serie di Taylor»: approssimazione polinomiale con errore e grafico
const taylorFact = (k) => (k < 2 ? 1 : k * taylorFact(k - 1));
