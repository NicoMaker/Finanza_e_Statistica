// Costruisce la scheda aperta: titolo, form, formule e risultati
function build(sc, set) {
  // Una sola scheda: niente frecce, niente altre schede della stessa sezione
  nav.innerHTML = `<button type="button" class="on" tabindex="-1" aria-current="page" style="--tc:${TH[cur][1]}"><b class="sy">${TH[cur][0]}</b>${T[cur].n}</button>`;
  ft.innerHTML = `<span class="sy">${TH[cur][0]}</span>${T[cur].n}`;
  theme();
  fm.innerHTML = T[cur].fm;
  form.innerHTML = T[cur].f
    .map((x) => {
      const id = "f_" + x.k,
        t = x.t || "n";
      return (
        `<div data-f="${x.k}"><label for="${id}">${x.l}</label>` +
        (t == "s"
          ? `<div class="seg" data-s="${id}">${x.o.map((o, j) => `<button type="button" class="sg${o[0] == x.v ? " on" : ""}" data-v="${o[0]}">${ic(cur, x.k, o[0], j)}<span>${o[1]}</span></button>`).join("")}</div><select id="${id}" hidden>${x.o.map((o) => `<option value="${o[0]}"${o[0] == x.v ? " selected" : ""}>${o[1]}</option>`).join("")}</select>`
          : t == "c"
            ? `<div class="cty"><button type="button" class="ctb" aria-haspopup="listbox"><img class="cf" alt=""><span></span><i>▾</i></button><div class="ctl" hidden><input class="cts" data-txt placeholder="Cerca nazione o valuta…" autocomplete="off" spellcheck="false"><ul role="listbox"></ul><p class="ctn" hidden>Nessuna nazione trovata</p></div><select id="${id}">${CTY.map((c) => `<option value="${c[0]}"${c[0] == x.v ? " selected" : ""}>${c[1]} · ${c[2]}</option>`).join("")}</select></div>`
            : t == "t"
              ? `<input id="${id}" data-txt value="${x.v}" autocomplete="off" spellcheck="false">`
              : t == "a"
                ? `<textarea id="${id}" rows="3">${x.v}</textarea>`
                : `<input id="${id}" inputmode="decimal" value="${x.v}">`) +
        "</div>"
      );
    })
    .join("");
  ap(set || {});
  calc();
  out.classList.add("an");
  clearTimeout(an);
  an = setTimeout(() => out.classList.remove("an"), 700);
  if (sc) {
    const y =
      main.getBoundingClientRect().top + scrollY - navw.offsetHeight - 12;
    if (scrollY > y) scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }
}
