// Funzioni sulle nazioni (i dati stanno in json/geografia/nazioni.json, il link bandiere in json/config/config.json)
const ctyOf = (iso) => CTY.find((c) => c[0] == iso) || CTY[0];
