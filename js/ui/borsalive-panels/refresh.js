// Aggiorna solo le parti dinamiche, senza ricostruire la pagina
BL.refresh = () => {
  const set = (id, h) => {
    const e = document.getElementById(id);
    if (e) e.innerHTML = h;
  };
  set("bl-kpi", BL.kpi());
  set("bl-eq", BL.eqInner());
  set("bl-pos", BL.posHtml());
  set("bl-log", BL.logHtml());
  set("bl-n", `${Object.keys(BL.S.pos).length} aperture`);
  set("bl-time", BLF.ora(new Date()));
};
