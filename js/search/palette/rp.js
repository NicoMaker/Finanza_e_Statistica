function rp() {
  pl.innerHTML = RS.length
    ? RS.map(
        (o, i) =>
          `<div class="pi${i == sel ? " on" : ""}" data-i="${i}" role="option"><span class="pg" style="background:${TH[o[0]][1]};font-style:normal">${TH[o[0]][0]}</span><div><b>${o[1]}</b><small>${o[2]} · ${T[o[0]].n}</small></div><kbd>↵</kbd></div>`,
      ).join("")
    : '<div class="pe">Nessun risultato</div>';
  const e = pl.querySelector(".on");
  if (e) e.scrollIntoView({ block: "nearest" });
}
