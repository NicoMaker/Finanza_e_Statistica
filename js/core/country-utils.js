// Funzioni sulle nazioni (i dati stanno in json/geografia/nazioni.json, il link bandiere in json/config/config.json)
const ctyOf = (iso) => CTY.find((c) => c[0] == iso) || CTY[0];
const ctyFlag = (iso) =>
  `<img class="cf" src="${CFG.bandiere.url.replace("{iso}", iso)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`;
const curName = (code) => {
  try {
    return new Intl.DisplayNames(["it"], { type: "currency" }).of(code);
  } catch (e) {
    return code;
  }
};
