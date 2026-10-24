// Tabella HTML e messaggio di errore usati dalle sezioni
const TB = (h, r) =>
  `<div class="tb"><table><tr>${h.map((x) => `<th>${x}</th>`).join("")}</tr>${r.map((q) => `<tr>${q.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}</table></div>`;
const ER = (m) => `<p class="err">${m}</p>`;
