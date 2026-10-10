// Nazioni con codice ISO (per la bandiera), nome italiano e valuta: [iso, nome, valuta]
const CTY =
  "it:Italia:EUR;de:Germania:EUR;fr:Francia:EUR;es:Spagna:EUR;nl:Paesi Bassi:EUR;pt:Portogallo:EUR;ie:Irlanda:EUR;at:Austria:EUR;be:Belgio:EUR;gr:Grecia:EUR;fi:Finlandia:EUR;us:Stati Uniti:USD;gb:Regno Unito:GBP;ch:Svizzera:CHF;jp:Giappone:JPY;ca:Canada:CAD;au:Australia:AUD;nz:Nuova Zelanda:NZD;cn:Cina:CNY;hk:Hong Kong:HKD;sg:Singapore:SGD;in:India:INR;kr:Corea del Sud:KRW;th:Thailandia:THB;br:Brasile:BRL;mx:Messico:MXN;ar:Argentina:ARS;se:Svezia:SEK;no:Norvegia:NOK;dk:Danimarca:DKK;pl:Polonia:PLN;cz:Rep. Ceca:CZK;hu:Ungheria:HUF;ro:Romania:RON;tr:Turchia:TRY;il:Israele:ILS;ae:Emirati Arabi:AED;sa:Arabia Saudita:SAR;za:Sudafrica:ZAR;eg:Egitto:EGP;ma:Marocco:MAD"
    .split(";")
    .map((x) => x.split(":"));
const ctyOf = (iso) => CTY.find((c) => c[0] == iso) || CTY[0];
const ctyFlag = (iso) =>
  `<img class="cf" src="https://flagcdn.com/w40/${iso}.png" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`;
const curName = (code) => {
  try {
    return new Intl.DisplayNames(["it"], { type: "currency" }).of(code);
  } catch (e) {
    return code;
  }
};
