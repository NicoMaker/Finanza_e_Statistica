const tbl = (R) =>
  `<div class="tb"><table><tr><th>Rata</th><th>Importo</th><th>Quota capitale</th><th>Quota interessi</th><th>Debito residuo</th></tr>${R.map(
    (r) =>
      `<tr><td>${fg(r[0])}</td>${r
        .slice(1)
        .map((x) => `<td>${f2(x)}</td>`)
        .join("")}</tr>`,
  ).join("")}</table></div>`;
