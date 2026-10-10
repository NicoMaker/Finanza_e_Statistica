// Borsa Live · le tre strategie del robot (soglie di acquisto/vendita, cash e dimensione delle operazioni)
const BL_STRATEGIE = {
  balanced: {
    name: "⚖️ Bilanciata",
    desc: "Il robot cerca un equilibrio tra rischio e rendimento. Compra su debolezza, vende su forza, mantiene il 30% in cash per le opportunità.",
    tags: [
      { t: "Rischio Medio", c: "mid" },
      { t: "Buy the dip" },
      { t: "Cash 30%" },
    ],
    maxPositions: 5,
    cashTarget: 0.3,
    buyThreshold: -1.5, // % di calo per comprare
    sellThreshold: 3.0, // % di guadagno per vendere
    tradeSize: 0.1, // 10% del capitale per operazione
  },
  aggressive: {
    name: "🚀 Aggressiva",
    desc: "Il robot punta a massimizzare i rendimenti. Compra più spesso, size maggiori, meno cash. Più volatilità, più opportunità.",
    tags: [
      { t: "Alto Rischio", c: "high" },
      { t: "Momentum" },
      { t: "Cash 10%" },
    ],
    maxPositions: 7,
    cashTarget: 0.1,
    buyThreshold: -0.8,
    sellThreshold: 5.0,
    tradeSize: 0.15,
  },
  conservative: {
    name: "🛡️ Conservativa",
    desc: "Il robot protegge il capitale. Compra solo su forti cali, vende appena in profitto, mantiene tanto cash.",
    tags: [
      { t: "Basso Rischio", c: "low" },
      { t: "Value investing" },
      { t: "Cash 50%" },
    ],
    maxPositions: 3,
    cashTarget: 0.5,
    buyThreshold: -3.0,
    sellThreshold: 2.0,
    tradeSize: 0.08,
  },
};
